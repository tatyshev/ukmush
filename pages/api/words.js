const dict = require('./dict.json');

module.exports = (req, res) => {
  const len = dict.length;
  const rnd = Math.trunc(Math.random() * len);
  const word = dict[rnd];

  res.json({
    word: {
      name: word.name,
      notes: word.notes.slice(0, 10),
    },
    max: len,
  });
};
