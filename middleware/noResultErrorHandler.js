const noResultErrorHandler = (err, req, res, next) => {
  if (err.name === "NoResultError") {
    return res.status(404).json({ message: err.message });
  }

  next(err);
};

export default noResultErrorHandler;
