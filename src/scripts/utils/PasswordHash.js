const cryptoJs = require("crypto-js");

const passwordToHash = (password) => {
  return cryptoJs.HmacSHA256(password, cryptoJs.HmacSHA1(password, process.env.PASSWORD_HASH).toString()).toString();
};

module.exports = { passwordToHash };
