import React from 'react';
import ReactDOM from 'react-dom';
import { configureLoggers, types, levels } from '@dlw/dlw-logger';
import App from './App';

const store = configureStore(rootReducer);

const loggers = [{ type: types.CONSOLE, minimumLogLevel: levels.INFO }];

const { serverConfig = {}} = window;
const { Logging = {}, Authentication = {} } = serverConfig;

if (Logging && Logging.ApplicationInsights && Logging.ApplicationInsights.InstrumentationKey
) {
  loggers.push({
    type: types.APP_INSIGHTS,
    minimumLogLevel: levels.DEBUG,
    instrumentationKey:
      Logging.ApplicationInsights.InstrumentationKey,
  });
}

if (Authentication && Authentication.clientId && Authentication.tenant && Authentication.resource) {
  configureAuthenticator({  
    clientId: Authentication.clientId,
    tenant: Authentication.tenant,
    resource: Authentication.resource,
  });
}

configureLoggers(loggers);
ReactDOM.render(<App store={store} />, document.getElementById('root'));

module.hot.accept();
