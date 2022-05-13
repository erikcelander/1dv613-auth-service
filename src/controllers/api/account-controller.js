/**
 * The user account controller.
 *
 * @author Erik Kroon Celander <ek223ur@student.lnu.se>
 * @version 1.0.0
 */
import User from '../../models/user.js'

/**
 * Encapsulates a controller.
 */
class AccountController {
  /**
   * Creates a new account.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async register (req, res, next) {
    console.log(req.body)
    try {
      const user = new User({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        admin: req.body?.admin
      })
      await user.save()
      console.log(user)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Logs in the user and returns an access token.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    try {
      const user = await User.authenticate(req.body.email, req.body.password)

      if (user) {
        res.status(200).json({ user: user })
      } else {
        res.status(404).json(null)
      }
    } catch (error) {
      error.status = 401
      error.message = 'error'
      next(error)
    }
  }

  async test(req, res, next) {
    res.status(200).json({
      message: 'success'
    })
  }
}

export default AccountController
