import { useState, useEffect } from 'react';
import { debug as logDebug, error as logError } from '@dlw/dlw-logger';
import 'whatwg-fetch';
import { checkStatus } from 'utils/check-api-status';
import { getToken, login } from '@dlw/dlw-authenticator';

export default function useAPI({ url, options = {}, immediately = true, authentication = true, }) {
  const defaultOptions = {
    method: 'GET',
    mode: 'same-origin',
    cache: 'default',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'client',
  };

  const [isLoading, setIsLoading] = useState(immediately);
  const [error, setError] = useState(null);
  const [data, setData] = useState();

  useEffect(() => {
    if (immediately) {
      fetchUrl();
    }
  }, []);

  const authenticate = async () => {
    try {
      let token = await getToken();
      if (!token) {
        login();
      }

      return token;
    } catch (err) {
      logError('useAPI hook - unknown login error', err);
    }
  };

  const fetchUrl = async () => {
    preFetch();
    
    // Test if authentication is necessary in order to fetch the token
    if (authentication) {
      const token = await authenticate();
      if (!token) {
        failure(new Error('Unsuccessful authentication'));
        return;
      }
    }

    try {
      const fetchOptions = {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          ...options.headers,
        },
      };
      // Add the authorization token when authentication is required
      if (authentication) {
        fetchOptions.headers.authorization = `Bearer ${token}`;
      }
      const response = await fetch(url, fetchOptions);
      checkStatus({ response, url });
      const json = await response.json();
      success(json);
    } catch (err) {
      failure(err);
    }
  };

  const preFetch = () => {
    logDebug({
      message: `useAPI hook - preparing to fetch ${url}`,
      properties: { url },
    });
    setIsLoading(true);
    setError(null);
    setData(undefined);
  };

  const success = data => {
    logDebug({
      message: `useAPI hook - fetch successful for ${url}`,
      properties: { url, data },
    });

    setIsLoading(false);
    setError(null);
    setData(data);
  };

  const failure = error => {
    logError({
      message: `${error} (thrown inside useAPI hook)`,
      properties: { url, error },
    });
    setIsLoading(false);
    setError(error);
    setData(undefined);
  };

  return [data, isLoading, error, fetchUrl];
}
