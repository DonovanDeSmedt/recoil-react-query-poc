import uuidv4 from 'uuid/v4';
import jwtDecode from 'jwt-decode';
// import log from './logger';

const log = console;

export default function authentication(conf) {
  const baseConfig = {
    baseUrl: 'https://login.windows.net',
    authorizeUrl: 'oauth2/authorize',
    logoutUrl: 'oauth2/logout',
    scope: 'openid',
    responseType: 'id_token token',
    prompt: 'login',
    clientRequestId: uuidv4(),
    cacheLocation: 'localStorage',
    enableLogging: true,
    prefix: 'auth',
  };
  const config = Object.assign({}, baseConfig, conf);
  const constants = {
    STATE: 'state',
    NONCE: 'nonce',
    TOKEN: 'token',
    TOKEN_EXPIRATION: 'token.expiration',
    IN_PROGRESS: 'progress',
    POLICY_USER_CANCELED_CODE: 'AADB2C90091',
  };

  if (!config.clientId) {
    throw new Error('clientId is required');
  }

  if (!config.tenant) {
    throw new Error('tenant is required');
  }

  if (!config.redirectUri) {
    if (!window.location.href) {
      window.location.href = `${window.location.protocol}//${
        window.location.hostname
      }${window.location.port ? `:${window.location.port}` : ''}`;
    }
    config.redirectUri = `${window.location.href}${window.location.search}`;
  }

  if (!config.postLogoutRedirectUri) {
    config.postLogoutRedirectUri = window.location.origin;
  }

  // local cache variables
  let user = {};
  let localError = '';

  const { prefix } = config;

  const storage = {
    set(key, value) {
      localStorage.setItem(`${prefix}-${key}`, value);
    },
    get(key) {
      return localStorage.getItem(`${prefix}-${key}`);
    },
    remove(key) {
      localStorage.removeItem(`${prefix}-${key}`);
    },
  };

  storage.set(constants.IN_PROGRESS, false);

  function getUrl() {
    function getUrlOptions() {
      const options = [
        `response_type=${config.responseType}`,
        `client_id=${encodeURIComponent(config.clientId)}`,
        `scope=${encodeURIComponent(config.scope)}`,
        `${
          config.resource
            ? `resource=${encodeURIComponent(config.resource)}`
            : ''
        }`,
        `redirect_uri=${encodeURIComponent(config.redirectUri)}`,
        `client-request-id=${encodeURIComponent(config.clientRequestId)}`,
        `nonce=${encodeURIComponent(storage.get(constants.NONCE))}`,
        `state=${encodeURIComponent(storage.get(constants.STATE))}`,
      ];

      return options.join('&');
    }

    return `${config.baseUrl}/${config.tenant}/${
      config.authorizeUrl
    }?${getUrlOptions()}`;
  }

  function getLoginHint() {
    if (user.email) {
      return encodeURIComponent(user.email);
    }
    return '';
  }

  function getLoginUrl() {
    let loginUrl = `${getUrl()}`;
    const loginHint = getLoginHint();
    if (loginHint) {
      loginUrl += `&login_hint=${loginHint}`;
    }
    return loginUrl;
  }

  function getRenewUrl() {
    let renewUrl = getUrl();
    const loginHint = getLoginHint();
    if (loginHint) {
      renewUrl += `&login_hint=${loginHint}`;
    }
    renewUrl += '&prompt=none';
    return renewUrl;
  }

  function getLogoutUrl() {
    let logoutUrl = `${config.baseUrl}/${config.tenant}/${config.logoutUrl}?`;
    if (config.loginPolicy) {
      logoutUrl += `p=${encodeURIComponent(config.loginPolicy)}`;
    }
    logoutUrl += `&post_logout_redirect_uri=${encodeURIComponent(
      config.postLogoutRedirectUri,
    )}`;
    log.info('logout url', logoutUrl);
    return logoutUrl;
  }

  function setStateAndNonce() {
    const state = `${config.prefix}__${uuidv4()}`;
    const nonce = `${config.prefix}__${uuidv4()}`;
    storage.set(constants.STATE, state);
    storage.set(constants.NONCE, nonce);
    return { state, nonce };
  }

  function isInProgress() {
    return storage.get(constants.IN_PROGRESS) === 'true';
  }

  function decodeTokenPayload(token) {
    try {
      return jwtDecode(token);
    } catch (e) {
      log.error('unable to decode token', e);
      return {};
    }
  }

  function createUser(familyName, givenName, name, email) {
    return { familyName, givenName, name, email };
  }

  function getCachedToken() {
    const token = storage.get(constants.TOKEN);
    const expiration = storage.get(constants.TOKEN_EXPIRATION);
    // add an extra 5 minutes offset to the check expiration.
    // prettier-ignore
    if (token && expiration && parseInt(expiration, 10) > (Date.now() / 1000) + 300) {
      return { response: token, error: null };
    } else if (localError) {
      return { response: null, error: localError };
    }
    return { response: null, error: null };
  }

  function renewToken(cb) {
    function getFrame(frameId) {
      let frameEl = document.getElementById(frameId);
      if (!frameEl) {
        if (document.createElement && document.documentElement) {
          const frame = document.createElement('iframe');
          frame.setAttribute('id', frameId);
          frame.style.visibility = 'hidden';
          frame.style.position = 'absolute';
          frame.style.width = '0';
          frame.style.height = 0;
          frame.borderWidth = 0;
          frame.src = 'about:blank';
          // frame.setAttribute('sandbox', 'allow-forms allow-scripts allow-same-origin');

          frameEl = document.body.appendChild(frame);
        }
        if (window.frames && window.frames[frameId]) {
          frameEl = window.frames[frameId];
        }
      }
      return frameEl;
    }

    function refreshIniFrame(renewUrl, frameId) {
      const frameCheck = frameId;
      setTimeout(() => {
        const frameHandle = getFrame(frameCheck);
        if (
          !frameHandle.src ||
          frameHandle.src === '' ||
          frameHandle.src === 'about:blank'
        ) {
          frameHandle.src = renewUrl;
          refreshIniFrame(renewUrl, frameCheck);
        }
      }, 10);
    }

    function registerCallback(callback, state) {
      if (!window.tokenCallback) {
        window.tokenCallback = {};
      }
      if (!window.tokenCallback[state]) {
        log.info('registering callback for state', state);
        window.tokenCallback[state] = callback;
      }
    }

    if (!isInProgress()) {
      storage.set(constants.IN_PROGRESS, true);
      const { state } = setStateAndNonce();
      log.info('renewing token');
      // variable to track if we are renewing in the iframe
      window.renewToken = true;
      // register the callback so we can call it from the iframe
      registerCallback(cb, state);
      refreshIniFrame(getRenewUrl(), 'refreshTokenFrame');
    }
  }

  function resetAndRemoveFrame() {
    const mainWindow = window.parent;
    mainWindow.renewToken = false;
    mainWindow.tokenCallback = {};
    // remove iframe from the dom
    const frame = mainWindow.document.getElementById('refreshTokenFrame');
    mainWindow.document.body.removeChild(frame);
  }

  function login(skipCachedToken = false) {
    let token = null;

    if (!skipCachedToken) {
      ({ response: token } = getCachedToken());
    }

    if ((!token && !isInProgress() && !localError) || skipCachedToken) {
      storage.set(constants.IN_PROGRESS, true);
      setStateAndNonce();
      log.info('logging in');
      if (skipCachedToken) {
        const mainWindow = window.parent;
        mainWindow.location.replace(getLoginUrl());
        resetAndRemoveFrame();
      } else {
        window.location.replace(getLoginUrl());
      }
      return Promise.resolve({ response: null, error: null });
    }
    return Promise.resolve({ response: token, error: null });
  }

  function clearStorage() {
    Object.keys(constants).forEach(key => {
      storage.remove(constants[key]);
    });
  }

  function logout() {
    clearStorage();
    localError = '';
    user = {};
    log.info('logging out');
    window.location.replace(getLogoutUrl());
  }

  function getToken() {
    const { response: token } = getCachedToken();
    if (!token) {
      // if not everything is present in the local storage,
      // return nothing, so it will login instead.
      if (
        !storage.get(constants.NONCE) ||
        !storage.get(constants.TOKEN) ||
        !storage.get(constants.STATE) ||
        !storage.get(constants.TOKEN_EXPIRATION)
      ) {
        return new Promise(resolve => resolve(null));
      }
      // else, try to renew
      return new Promise(resolve => renewToken(resolve));
    }
    return new Promise((resolve, reject) => {
      if (localError) {
        reject(localError);
      } else {
        resolve(token);
      }
    });
  }

  function getUrlParameters() {
    function deserializeHash(query) {
      let match;
      const pl = /\+/g; // Regex for replacing addition symbol with a space
      const search = /([^&=]+)=?([^&]*)/g;
      const decode = s => decodeURIComponent(s.replace(pl, ' '));
      const parameters = {};
      match = search.exec(query);
      while (match) {
        parameters[decode(match[1])] = decode(match[2]);
        match = search.exec(query);
      }
      return parameters;
    }

    function getHash(hash) {
      let hashString = '';
      if (hash.indexOf('#/') > -1) {
        hashString = hash.substring(hash.indexOf('#/') + 2);
      } else if (hash.indexOf('#') > -1) {
        hashString = hash.substring(1);
      }
      return (hashString && deserializeHash(hashString)) || null;
    }

    function getQueryParams(url) {
      return url
        .substr(1)
        .split('&')
        .reduce((params, item) => {
          const [key, value] = item.split('=');
          // eslint-disable-next-line no-prototype-builtins
          if (!params.hasOwnProperty(key)) {
            return Object.assign({}, params, {
              [key]: decodeURIComponent(value),
            });
          }
          return params;
        }, {});
    }

    return (
      getHash(window.location.hash) || getQueryParams(window.location.search)
    );
  }

  function validateToken(token, getParameter) {
    let validToken = true;
    let validatedUser = null;
    // validate state
    const state = getParameter('state');
    if (
      state.startsWith(`${config.prefix}__`) &&
      state !== storage.get(constants.STATE)
    ) {
      log.error('invalid state');
      validToken = false;
      localError = 'Invalid state received when trying to authenticate';
    }
    /* eslint-disable camelcase */
    const {
      nonce,
      aud,
      exp,
      family_name,
      given_name,
      name,
      email,
    } = decodeTokenPayload(token);
    validatedUser = createUser(family_name, given_name, name, email);
    /* eslint-enable camelcase*/
    // validate nonce
    if (
      nonce.startsWith(`${config.prefix}__`) &&
      nonce !== storage.get(constants.NONCE)
    ) {
      log.error('invalid nonce');
      validToken = false;
      localError = 'Invalid nonce received when trying to authenticate';
    }

    // validate audience
    if (aud !== config.clientId) {
      log.error('invalid audience');
      validToken = false;
      localError = 'Invalid audience received when trying to authenticate';
    }

    // validate expiration
    if (Date.now() > exp * 1000) {
      log.error('invalid expiration');
      validToken = false;
      localError =
        'Invalid expiration token received when trying to authenticate';
    }

    return { validToken, validatedUser, state, exp };
  }

  /* eslint-disable complexity */

  function handleWindowCallback() {
    const parameters = getUrlParameters();
    const getParameter = key => parameters[key];
    const token = getParameter('id_token');
    const accessToken = getParameter('access_token');
    const state = getParameter('state');

    const initiatedHere = state && state.startsWith(`${config.prefix}__`);

    if (!initiatedHere) {
      return;
    }

    if (token || accessToken) {
      const { validToken, validatedUser, exp } = validateToken(
        token,
        getParameter,
      );

      if (accessToken) {
        if (validToken) {
          user = validatedUser;
          // reset values
          storage.set(constants.IN_PROGRESS, false);
          storage.set(constants.TOKEN, accessToken);
          storage.set(constants.TOKEN_EXPIRATION, exp);
          localError = '';
          // call actions to update UI
        } else {
          log.error('Invalid token');
        }

        // when refreshing in iframe, get the callback that was registered
        if (
          window.parent &&
          window.parent !== window &&
          window.parent.renewToken
        ) {
          const callback = window.parent.tokenCallback[state];
          if (callback) {
            callback(accessToken);
          } else {
            log.warn('No callback registered for state', state);
            localError = 'Invalid state received when trying to renew token';
          }
          resetAndRemoveFrame();
        } else {
          window.location.hash = '';
        }
      } else if (token) {
        if (validToken) {
          user = validatedUser;
          // reset values
          storage.set(constants.IN_PROGRESS, false);
          storage.set(constants.TOKEN, token);
          storage.set(constants.TOKEN_EXPIRATION, exp);
          localError = '';
          // call actions to update UI
        } else {
          log.error('Invalid token');
        }

        // when refreshing in iframe, get the callback that was registered
        if (
          window.parent &&
          window.parent !== window &&
          window.parent.renewToken
        ) {
          const callback = window.parent.tokenCallback[state];
          if (callback) {
            callback(token);
          } else {
            log.warn('No callback registered for state', state);
            localError = 'Invalid state received when trying to renew token';
          }
          resetAndRemoveFrame();
        } else {
          window.location.hash = '';
        }
      }
    } else if (getParameter('error_description') || getParameter('error')) {
      const err = getParameter('error_description');
      log.error(err);
      storage.set(constants.IN_PROGRESS, false);
      window.location.hash = '';
      // eslint-disable-next-line no-bitwise
      if (!~err.indexOf(constants.POLICY_USER_CANCELED_CODE)) {
        localError = err;
      }
      if (
        getParameter('error') &&
        window.parent &&
        window.parent !== window &&
        window.parent.renewToken
      ) {
        // login, & skip the cached token check
        login(true);
      }
    }
  }
  /* eslint-enable complexity */

  handleWindowCallback();

  return { login, logout, getToken, getCachedToken, isInProgress, config };
}
