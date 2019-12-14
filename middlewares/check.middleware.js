module.exports.isWorked = (req, res, next) => {
  if (req.worker.isWorking) {
    next()
  } else {
    req.session.genericError = 'User is not worked!'
    res.redirect('/');
  }
}

module.exports.isNotWorked = (req, res, next) => {
  if (req.worker.isWorking) {
    res.redirect('/');
  } else {
    next()
  }
}