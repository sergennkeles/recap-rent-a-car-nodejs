const { add } = require("../services/brands");

const create = (req, res) => {
  add(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
};

module.exports = {
  create,
};
