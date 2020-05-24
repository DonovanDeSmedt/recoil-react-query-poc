import React from 'react';
import ReactDOM from 'react-dom';
import { configureLoggers, types, levels } from '@dlw/dlw-logger';
import App from './App';

const store = configureStore(rootReducer);

const loggers = [{ type: types.CONSOLE, minimumLogLevel: levels.DEBUG }];

if (
  window.serverConfig &&
  window.serverConfig.Logging &&
  window.serverConfig.Logging.ApplicationInsights &&
  window.serverConfig.Logging.ApplicationInsights.InstrumentationKey
) {
  loggers.push({
    type: types.APP_INSIGHTS,
    minimumLogLevel: levels.DEBUG,
    instrumentationKey:
      window.serverConfig.Logging.ApplicationInsights.InstrumentationKey,
  });
}

configureLoggers(loggers);
ReactDOM.render(<App store={store} />, document.getElementById('root'));

module.hot.accept();
