const brandService = require("../services/Brands");
const httpStatus = require("http-status");
const apiError = require("../errors/ApiError");

const create = (req, res) => {
 brandService.add(req.body)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const update = (req, res, next) => {
  brandService.modify(req.params?.id, req.body)
    .then((response) => {
      if (!response) {
        return next(new apiError("Hatalı ID bilgisi", httpStatus.NOT_FOUND));
      } else {
        res.status(httpStatus.OK).send(response);
      }
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const list = (req, res) => {
  brandService.getAll()
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const deleted = (req, res, next) => {
 brandService.remove(req.params?.id)
    .then((response) => {
      if (!response) {
        return next(new apiError("Böyle bir kayıt yok", httpStatus.NOT_FOUND));
      } else {
        res.status(httpStatus.OK).send({ message: "Kayıt başarılı bir şekilde silinmiştir." });
      }
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const getById = (req, res, next) => {
  brandService.findById(req.params?.id)
    .then((response) => {
      if (!response) {
        return next(new apiError("Böyle bir kayıt yok", httpStatus.NOT_FOUND));
      } else {
        res.status(httpStatus.OK).send(response);
      }
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

module.exports = {
  create,
  list,
  update,
  deleted,
  getById,
};
