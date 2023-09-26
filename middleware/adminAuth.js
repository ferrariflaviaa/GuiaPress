function adminAuth(req, res, next) {
  if(req.session.user != undefined){
    next()
  }else{
    res.redirect("/")
  }
}
function adminNotAuth(req, res, next) {
  console.log(req.session.user )
  if(req.session.user == undefined){
    next()
  }else{
    res.redirect("/")
  }
}
module.exports ={ adminAuth, adminNotAuth}