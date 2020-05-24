import { useState, useEffect } from 'react';
import { debug as logDebug, error as logError } from '@dlw/dlw-logger';
import 'whatwg-fetch';
// TODO: auth-manager to be replaced with authentication package.
import authManager from 'utils/auth-manager';

export default function useAPI(url, immediately = true) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState();

  useEffect(() => {
    if (immediately) {
      fetchUrl();
    }
  }, []);

  async function authenticate() {
    try {
      let token = await authManager.getToken();
      if (!token) {
        token = await authManager.login();
      }

      return token;
    } catch (err) {
      logError('useAPI hook - unknown login error', err);
    }
  }

  async function fetchUrl() {
    preFetch();
    const token = await authenticate();
    if (!token) {
      failure(new Error('Unsuccesful authentication'));
    }
    try {
      const response = await fetch(url, {
        headers: { authorization: `Bearer ${token}` },
      });
      const json = await response.json();
      success(json);
    } catch (err) {
      failure(err);
    }
  }

  function preFetch() {
    logDebug({
      message: `useAPI hook - preparing to fetch ${url}`,
      properties: { url },
    });
    setIsLoading(true);
    setError(null);
    setData(undefined);
  }

  function success(data) {
    logDebug({
      message: `useAPI hook - fetch successful for ${url}`,
      properties: { url, data },
    });
    setIsLoading(false);
    setError(null);
    setData(data);
  }

  function failure(error) {
    logError({
      message: `${error} (thrown inside useAPI hook)`,
      properties: { url, error },
    });
    setIsLoading(false);
    setError(error);
    setData(undefined);
  }

  return [data, isLoading, error, fetchUrl];
}
