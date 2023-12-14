export const getUserId = (req, res, next) => {
  try {
    req.params.id = req.user.id;
    next();
  } catch (error) {
    next(error);
  }
};
