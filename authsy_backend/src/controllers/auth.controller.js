const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const base32 = require('thirty-two');
var crypto = require('crypto');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const googleCallback = catchAsync(async (req, res) => {
  const accessToken = req.user.tokens.access.token;
  const refreshToken = req.user.tokens.refresh.token;
  res.cookie('JWT', JSON.stringify({ accessToken, refreshToken }), {
    maxAge: 1000 * 30 * 60,
    httpOnly: false,
    sameSite: true,
  })
  if (process.env.NODE_ENV === 'production')
    res.redirect(`${process.env.BASE_URL}/auth/success`);
  else res.redirect(`${process.env.DEV_BASE_URL}/auth/success`);
})

const totpSecretGenerate = catchAsync(async (req, res) => {
  var secret = base32.encode(crypto.randomBytes(16));
  //Discard equal signs (part of base32, 
  //not required by Google Authenticator)
  //Base32 encoding is required by Google Authenticator. 
  //Other applications
  //may place other restrictions on the shared key format.
  const user = req.user
  if (!req.user.key) {
    secret = secret.toString().replace(/=/g, '');
    const updated = await userService.updateUserKeyById(user._id, secret)
    res.send({ user: updated })
  } else {
    res.send({ message: 'Key already exists' })
  }
})

const totpSecretQR = catchAsync(async (req, res) => {
  var url = null;
  const user = await userService.getUserById(req.user._id)
  if (user.key) {
    var qrData = `otpauth://totp/Authsy:${user.email}?secret=${user.key}`
    url = "https://chart.googleapis.com/chart?chs=166x166&cht=qr&chl=" +
      qrData;
  }
  res.send({
    user: req.user,
    qrUrl: url
  });
})

const setMobileConfigured = catchAsync(async (req, res) => {
  const user = req.user
  if (!req.user.key) {
    res.send({ message: 'Error! No Key Configured' })
  } else {
    //ToDo: Check if deleting the key at this point is viable
    const updated = await userService.updateUserMobileConfig(user._id, true)
    res.send({ user: updated })
  }
})

const getKey = catchAsync(async (req, res) => {
  if (!req.user.key) {
    res.send({ message: 'Error! No Key Configured' })
  } else if (req.user.mobileConfigured){
    res.send({ message: 'Error! Key already Configured' })
  } 
  else {
    //ToDo: Check if deleting the key at this point is viable
    const key = String(req.user.key)
    res.send({key})
  }
})

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  googleCallback,
  totpSecretGenerate,
  totpSecretQR,
  setMobileConfigured,
  getKey
};
