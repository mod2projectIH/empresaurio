module.exports.isAuthenticated = (req, res, next) => {
  const worker = req.session.worker


  if (req.session.worker && !worker.isHR) {
    next()


  } else {
    req.session.genericError = 'User is not authenticated!'
    res.redirect('/login');
  }
}
module.exports.isNotAuthenticated = (req, res, next) => {
  const worker = req.session.worker
  if (req.session.worker && !worker.isHR) {


    res.redirect('/');
  } else {
    next()
  }
}

module.exports.isHR = (req, res, next) => {
  const worker = req.session.worker

  if (req.session.worker && worker.isHR) {
    next()
  } else {
    req.session.genericError = 'User is not authenticated!'
    res.redirect('/login');
  }
}

module.exports.isNotHR = (req, res, next) => {
  const worker = req.session.worker
  if (req.session.worker && worker.isHR) {


    res.redirect('/');
  } else {
    next()
  }
}
