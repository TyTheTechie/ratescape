import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  // Get the token from the header
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    // Verify the token
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next(); // Continue to the next middleware/route handler
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

export default authenticate;
