const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'this_secret_should_be_longer');
    req.userData = {
      email: decodedToken.email, 
      password: decodedToken.password
    };
    next();
  } catch (error) {
    res.status(401).json({ message: 'You are not authenticated!' });
  }
};