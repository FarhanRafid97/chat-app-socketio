const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.sendStatus(401);
  jwt.verify(authHeader, process.env.SECRET_TOKEN_JWT, (err, decode) => {
    if (err) return res.status(403).json({ msg: 'token invalid or expired' });
    console.log('test <id></id>', decode.id);
    req.userId = decode.id;
    next();
  });
};

module.exports = verifyToken;
