const min = 100000;
const max = 999999;

const tokenGenerator = () => {
  return min + Math.floor((max - min) * Math.random());
}

module.exports = tokenGenerator;
