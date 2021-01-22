  import statuses from 'http-status-codes';
  import passport from 'passport';
  import ErrorResponse from'../utils/errorResponse.js';
  import rbac from '../rbac/rbac.js';
  
  const isAuthorized = (endPointName) => {
    return (req, res, next) => {
      try {
        if (
          !req.headers.authorization ||
          !req.headers.authorization.startsWith('Bearer')
        ) {
          return next(new ErrorResponse('Unauthorized', statuses.UNAUTHORIZED ));
        }
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
          return next(new ErrorResponse('Unauthorized', statuses.UNAUTHORIZED));
        }
        passport.authenticate('jwt', { session: false }, async (err, user) => {
          if (err) {
            return next(new ErrorResponse(err.message, statuses.INTERNAL_SERVER_ERROR));
          }
          if (!user) {
            return next(new ErrorResponse('Unauthorized', statuses.UNAUTHORIZED));
          }
          req.user = user;
          const isAllowed = await rbac.can(req.user.roleId, endPointName);
          if (!isAllowed) {
            return next(
              new ErrorResponse(
                'Access to the requested URL is Forbidden',
                statuses.FORBIDDEN
              )
            );
          }
          return next();
        })(req, res, next);
      } catch (err) {
        return next(new ErrorResponse(err.message, statuses.INTERNAL_SERVER_ERROR));
      }
    };
  };
  
 export default isAuthorized;
  