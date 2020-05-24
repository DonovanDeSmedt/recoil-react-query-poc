export const checkStatus = ({ response, url }) => {
  /*
  Default status codes also present in MW template
  https://wiki.delawareconsulting.com/pages/viewpage.action?pageId=122061198
  400 - Front-end can't fix the problem	- BusinessException
  401 - Not authenticated	 
  403 - Not authorized for the requested action	 
  409 - Front-end must take action exception - Is not logged in App Insights
  500 - MW bug - TechnicalException
  502 - Backend problem	- eg SAP
  */

  if (!response) {
    throw Error(`Uncaught (no response) - Something went wrong calling ${url}`);
  }

  if (status === 400) {
    throw Error(
      `Business exception - ${url} responded with a status code ${
        response.status
      }`,
    );
  }

  if (status === 401) {
    throw Error(
      `Unauthorized - ${url} responded with a status code ${response.status}`,
    );
  }

  if (status === 403) {
    throw Error(
      `Forbidden - ${url} responded with a status code ${response.status}`,
    );
  }

  if (status === 404) {
    throw Error(
      `Not found - the requested resource was not found. ${url} responded with a status code ${
        response.status
      }`,
    );
  }

  if (status > 404 && status < 500 && status !== 409) {
    throw Error(
      `Uncaught - ${url} responded with a status code ${response.status}`,
    );
  }

  if (status === 500) {
    throw Error(
      `Server Error - ${url} responded with a status code ${response.status}`,
    );
  }

  if (status === 502) {
    throw Error(
      `Backend Error - ${url} responded with a status code ${response.status}`,
    );
  }

  if (status > 500) {
    throw Error(
      `Uncaught - ${url} responded with a status code ${response.status}`,
    );
  }
  return null;
};
