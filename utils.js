import jwt from 'jsonwebtoken'

function validateToken (req, res, next) {
  let result
  const authorizationHeader = req.headers.authorization
  let token = req.cookies.token

  if (!authorizationHeader && !token) throw {status: 401, message: 'Authentication error. Token required.'}

  token = authorizationHeader ? authorizationHeader.split(' ')[1] : token
  const options = { expiresIn: '2d', issuer: 'Mr Beniamino' }

  try {
    result = jwt.verify(token, process.env.JWT_SECRET, options)
    req.decoded = result
    next()
  } catch (err) {
    next(err)
  }
}

export { validateToken }
