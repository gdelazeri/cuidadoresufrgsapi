const validatePassword = (password = '') => {
  if (password.length >= 8) {
    let count = 0;
    if (/[a-z]/g.test(password)) count++;
    if (/[A-Z]/g.test(password)) count++;
    if (/[0-9]/g.test(password)) count++;
    if (/[!@#$%^&*(),.?":{}|<>]/g.test(password)) count++;
    return count >= 3;
  }
  return false;
}

module.exports = validatePassword;