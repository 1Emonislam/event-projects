const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};


const errorHandler =async (err, req, res, next) => {
	if (err.name === "ValidationError") {
		const errors = {};
		await Object.values(err.errors).map((val) => {
			errors[val.path] = val.message
		});
		return res.status(400).json({ error: errors });
	} else {
		res.status(500).json({ error: err.message });
	}
};

module.exports = { notFound, errorHandler };