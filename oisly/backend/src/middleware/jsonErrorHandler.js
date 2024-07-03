const jsonErrorHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError && 'body' in err) {
      res.status(400).json({ error: 'Error de sintaxis en JSON' });
    } else {
      next();
    }
  };
  
  module.exports = jsonErrorHandler;