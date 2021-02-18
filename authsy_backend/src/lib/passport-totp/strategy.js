var passport = require('passport-strategy')
  , totp = require('../totp').totp
  , util = require('util');

// * References:
// *  - [TOTP: Time-Based One-Time Password Algorithm](http://tools.ietf.org/html/rfc6238)
// *  - [KeyUriFormat](https://code.google.com/p/google-authenticator/wiki/KeyUriFormat)
function Strategy(options, setup) {
  if (typeof options == 'function') {
    setup = options;
    options = {};
  }
  
  this._codeField = options.codeField || 'code';
  this._window = options.window !== undefined ? options.window : 6;
  
  passport.Strategy.call(this);
  this._setup = setup;
  this.name = 'totp';
}


util.inherits(Strategy, passport.Strategy);


Strategy.prototype.authenticate = function(req, options) {
  var value = lookup(req.body, this._codeField) || lookup(req.query, this._codeField);
  
  var self = this;
  this._setup(req.user, function(err, key, period) {
    if (err) { return self.error(err); }
    
    var rv = totp.verify(value, key, { window: self._window, time: period });
    if (!rv) { return self.fail(); }
    return self.success(req.user);
  });
  
  
  function lookup(obj, field) {
    if (!obj) { return null; }
    var chain = field.split(']').join('').split('[');
    for (var i = 0, len = chain.length; i < len; i++) {
      var prop = obj[chain[i]];
      if (typeof(prop) === 'undefined') { return null; }
      if (typeof(prop) !== 'object') { return prop; }
      obj = prop;
    }
    return null;
  }
}

module.exports = Strategy;
