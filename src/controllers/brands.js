const { add } = require("../services/brands");

const create = (req, res) => {
  add({ name: "sergen", lastname: "keleş" });
  res.status(200).send("created");
};

module.exports = {
  create,
};
