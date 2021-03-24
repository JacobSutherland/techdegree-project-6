const newError = ((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    err.message = "Not Found";
    next(err);
  });

  module.exports = newError;