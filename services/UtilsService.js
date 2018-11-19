import jwt from 'jsonwebtoken'

class UtilsService {
  static validateToken (req) {
    let result
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader) throw {status: 401, message: 'Authentication error. Token required.'}

    const token = req.headers.authorization.split(' ')[1]
    const options = { expiresIn: '2d', issuer: 'Mr Beniamino' }

    try {
      result = jwt.verify(token, process.env.JWT_SECRET, options)
      req.decoded = result
    } catch (err) {
      throw err
    }
  }
}

export default UtilsService
