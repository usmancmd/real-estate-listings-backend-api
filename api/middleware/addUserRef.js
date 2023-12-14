export const addUserRef = (req, res, next) => {
  try {
    req.body.userRef = req.user.id;
    next();
  } catch (error) {
    next(error);
  }
};
