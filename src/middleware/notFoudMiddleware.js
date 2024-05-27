const notFoudMiddleware = (req, res, next) => {
    res.status(404).json({ 
     message: 'Not found this page' });
  };
  
export default notFoudMiddleware;