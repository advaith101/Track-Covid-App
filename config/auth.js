module.exports = {
    ensureAuthenticated: function(req, res, next) {
      console.log('ensureAuth')
      if (req.isAuthenticated()) {
        return next();
      }
      console.log('ensure authenticated');
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/users/login');
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      console.log('forward authenticated');
      res.redirect('/dashboard');      
    }
  };