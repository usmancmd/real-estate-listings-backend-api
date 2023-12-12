export const errorHandler = (error, req, res) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};
