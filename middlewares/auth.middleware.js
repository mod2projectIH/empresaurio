module.exports.isAuthenticated = (req, res, next) => {
  if (req.session.worker) {

    next()
    console.log("AAA")
  } else {
    req.session.genericError = 'User is not authenticated!'
    res.redirect('/login');
  }
}

module.exports.isNotAuthenticated = (req, res, next) => {
  if (req.session.worker) {
    res.redirect('/');
  } else {
    next()
  }
}