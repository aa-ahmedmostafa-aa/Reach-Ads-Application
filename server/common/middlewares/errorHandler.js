/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import statuses from 'http-status-codes';

// @desc Error handler
const errorHandler = (err, req, res, next) => {
  console.error(
    `Message: ${JSON.stringify(err.message)}, Stack: ${JSON.stringify(
      err.stack
    )}`
  );
  return res.status(err.status || statuses.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || 'Internal Server Error',
    data: null
  });
};

export default errorHandler;
