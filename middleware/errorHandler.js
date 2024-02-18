const errorHandler = (err, req, res, next) => {
  //algemene errorHandler
  console.error("Handling generic error:", err);
  res.status(500).json({ message: "Interne serverfout !" });
};

export default errorHandler;
