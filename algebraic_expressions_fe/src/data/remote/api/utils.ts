import {AxiosError} from 'axios';
import {AppHttpError} from '../models/common';

type ApiErrorResponse = {
  statusCode: number;
  message: string[] | string;
  error: string;
};



/**
 * Base error handler.
 *
 * @param error Axios error of @type AxiosError
 * @returns mapped object with status code and error message of @type AppHttpError
 */
export const handleError = (error: AxiosError): AppHttpError => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx

    const status = error.response.status;

    if (status === 0) {
      return {
        code: status,
        message: 'Could not connect to server',
        meta: 'unknown'
      };
    }

    const message = parseErrorData(error.response.data as ApiErrorResponse);


    return {
      code: status,
      message: status === 502 ? 'Service is under maintenance please try again later' : message,
      meta: status >= 400 && status < 500 ? 'client' : 'server'
    };
  } else if (error.request) {
    return {
      code: -1,
      message: error.message,
      meta: 'unknown'
    };
  } else {


    return {
      code: -1,
      message: error.message,
      meta: 'unknown'
    };
  }
};

const parseErrorData = (data: ApiErrorResponse): string => {
  if (typeof data.message === 'string') {
    return data.message;
  } else if (Array.isArray(data.message)) {
    let errorMessages = '';

    const errors = data.message;

    if (errors.length === 1) {
      errorMessages = errors[0];
    } else {
      errors.forEach(v => {
        errorMessages = errorMessages.concat(v).concat('\n');
      });
    }

    return errorMessages;
  }

  return 'Unknown error';
};
