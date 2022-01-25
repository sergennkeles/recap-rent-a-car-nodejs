const { add } = require("../services/brands");
const httpStatus = require("http-status");

const create = (req, res) => {
  add(req.body)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

module.exports = {
  create,
};
