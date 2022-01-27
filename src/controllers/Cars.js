const { add, get, modify, remove, findById } = require("../services/Cars");
const httpStatus = require("http-status");
const apiError = require("../errors/ApiError");

const create = (req, res) => {
  add(req.body)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const update = (req, res, next) => {
  modify(req.params?.id, req.body)
    .then((response) => {
      if (!response) {
        return next(new apiError("ID bilgisi hatalı", httpStatus.NOT_FOUND));
      } else {
        res.status(httpStatus.OK).send(response);
      }
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const list = (req, res) => {
  get()
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const deleted = (req, res, next) => {
  remove(req.params?.id)
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
  findById(req.params?.id)
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

const getByBrandId = (req, res, next) => {
  get({ brandId: req?.params?.brandId })
    .then((response) => {
      if (response.length == 0) {
        return next(new apiError("Böyle bir marka kaydı yok", httpStatus.NOT_FOUND));
      } else {
        res.status(httpStatus.OK).send(response);
      }
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const getByColorId = (req, res, next) => {
  get({ colorId: req?.params?.colorId })
    .then((response) => {
      if (response.length == 0) {
        return next(new apiError("Böyle bir renk kaydı yok", httpStatus.NOT_FOUND));
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
  getByBrandId,
  getByColorId,
};
