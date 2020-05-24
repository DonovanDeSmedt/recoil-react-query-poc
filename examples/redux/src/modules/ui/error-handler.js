import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

// const Alert = styled(AntdAlert)`
//   margin: 10px 0;
// `;

// // sometimes we have to add !important to override antd styles specificity
// const ErrorButton = styled(Button)`
//   background-color: ${p => p.theme.colors.themeSecondary} !important;
//   color: #fff !important;
//   border-color: transparent !important;
//   text-transform: uppercase;
//   font-weight: ${p => p.theme.fontWeight.bolder};
//   margin: 5px 5px 0 0;
//   &:hover {
//     background-color: #fff !important;
//     color: ${p => p.theme.colors.themeSecondary} !important;
//   }
// `;

// const Description = styled.div`
//   word-wrap: break-word;
// `;

// const ErrorList = styled.ul`
//   list-style: disc;
//   padding-left: 1rem;
//   margin-bottom: 0.3rem;
// `;

// export function getErrorOptions({ status, message, errors }) {
//   const getDescription = msg => <Description>{msg}</Description>;

//   const createCustomOptions = (defaultMessage, defaultDescription) => {
//     // check for errors sent from api and display them
//     if (errors && errors.length > 0) {
//       return {
//         message,
//         description: (
//           <ErrorList>
//             {errors.map((err, i) => (
//               <li key={i}>{err}</li>
//             ))}
//           </ErrorList>
//         ),
//         type: 'error',
//       };
//     }
//     // otherwise display generic message (based on Steven's implementation)
//     return {
//       message: defaultMessage,
//       description: getDescription(defaultDescription),
//       type: 'error',
//     };
//   };

//   if (status === 400) {
//     return createCustomOptions(
//       'Not found',
//       message || 'The enpoint was invalid',
//     );
//   } else if (status === 401) {
//     return {
//       message: 'Unauthorized',
//       description: getDescription(message || 'Please login'),
//       type: 'error',
//     };
//   } else if (status === 403) {
//     return createCustomOptions('Forbidden', message || 'Unable to access');
//   } else if (status > 404 && status < 500 && status !== 409) {
//     return createCustomOptions(
//       `HTTP error ${status}`,
//       message || "There's something wrong with the request",
//     );
//   } else if (status >= 500) {
//     return createCustomOptions(
//       'Server error',
//       message || 'Something went wrong.',
//     );
//   } else if (status === 'FETCH_ERROR') {
//     return {
//       message: 'Fetch error',
//       description: getDescription(message),
//       type: 'error',
//     };
//   }
//   return null;
// }

const ErrorHandler = ({ error }) => {
  if (!error) {
    return null;
  }
  return <div>ERROR - {error.message} </div>;
};

export default ErrorHandler;

// class ErrorHandler extends PureComponent {
//   static propTypes = {
//     error: PropTypes.object,
//     history: PropTypes.object,
//     dispatch: PropTypes.func,
//     type: PropTypes.oneOf(['alert', 'notification']).isRequired,
//   };

//   static defaultProps = {
//     type: 'alert',
//     error: {},
//   };

//   showAlert = ({ message, description, type, retryAction }) => {
//     const { dispatch } = this.props;
//     window.scrollTo(0, 0);
//     return (
//       <Alert
//         ref={el => (this.alert = el)}
//         message={message}
//         closable
//         closeText="Close"
//         description={
//           <>
//             {description}
//             <>
//               {retryAction && (
//                 <ErrorButton onClick={() => dispatch(retryAction)} icon="sync">
//                   Retry
//                 </ErrorButton>
//               )}
//             </>
//           </>
//         }
//         type={type}
//         showIcon
//       />
//     );
//   };

//   showNotification = options => {
//     const { dispatch } = this.props;
//     setTimeout(() => {
//       dispatch(showNotification(options));
//     }, 0);
//   };

//   handleNotFound = message => {
//     const { history, dispatch } = this.props;
//     const description = <Description>{message}</Description>;
//     const key = Date.now();
//     const btnClick = () => {
//       dispatch(clearNotifications());
//       history.push('/feed/dashboard');
//     };
//     const btn = (
//       <FeatureToggle name="myFeed">
//         <AntdButton onClick={btnClick}>Goto feed</AntdButton>
//       </FeatureToggle>
//     );
//     const options = {
//       message: 'Not found',
//       description,
//       type: 'warning',
//       duration: 0,
//       key,
//       btn,
//     };
//     this.showNotification(options);
//   };

//   render() {
//     const { type, error } = this.props;
//     if (Object.keys(error).length) {
//       const { status, message, errors, retryAction } = error;
//       // we always treat 404 as a notification since we will redirect
//       if (status === 404) {
//         this.handleNotFound(message);
//       }
//       const options = getErrorOptions({ status, message, errors });
//       if (options) {
//         if (type === 'alert') {
//           return this.showAlert({ ...options, retryAction });
//         }
//         this.showNotification(options);
//       }
//     }
//     return null;
//   }
// }

// export default compose(connect())(ErrorHandler);
