const errorHandler = (err, req, res, next) => {
    console.error(err);
  
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res.status(400).json({ error: 'Bad request' });
    }
  
    if (err.name === 'ValidationError') {
      const errorMessages = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({ errors: errorMessages });
    }

    res.status(500).json({ error: err.message });
  };
  
  module.exports = errorHandler;
  