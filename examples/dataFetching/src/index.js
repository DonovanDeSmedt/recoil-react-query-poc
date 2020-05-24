import React from 'react';
import ReactDOM from 'react-dom';
import { configureLoggers, types, levels } from '@dlw/dlw-logger';
import App from './App';

const loggers = [{ type: types.CONSOLE, minimumLogLevel: levels.INFO }];

// if (
//   window.serverConfig &&
//   window.serverConfig.Logging &&
//   window.serverConfig.Logging.ApplicationInsights &&
//   window.serverConfig.Logging.ApplicationInsights.InstrumentationKey
// ) {
//   loggers.push({
//     type: types.APP_INSIGHTS,
//     minimumLogLevel: levels.TRACE,
//     instrumentationKey:
//       window.serverConfig.Logging.ApplicationInsights.InstrumentationKey,
//   });
// }

configureLoggers(loggers);
const title = 'My react is it hot Babel Setup';
ReactDOM.render(<App />, document.getElementById('root'));

module.hot.accept();
