  module.exports = (req, res, next) => {
    res.locals.genericError = req.session.genericError
    req.session.genericError = null

    res.locals.genericSuccess = req.session.genericSuccess
    req.session.genericSuccess = null

    res.locals.currentUser = req.session.worker
    req.currentUser = req.session.worker

    next()
  }