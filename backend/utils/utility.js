// Generate a random number between 0 and 1
let randomNum = Math.random();

// Generate a random integer between min (inclusive) and max (inclusive)
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports =  getRandomInt;
