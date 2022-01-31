const { add, get, modify, remove, findById } = require("../services/CarImages");
const httpStatus = require("http-status");
const apiError = require("../errors/ApiError");
const path = require("path");
const uuid = require("uuid");

const create = (req, res) => {

  if (!req?.files?.carImage) {
    return res.status(httpStatus.BAD_REQUEST).send({ error: "Bu işlemi yapabilmek için yeterli veriye sahip değilsiniz" });
  }

  const extension = path.extname(req.files.carImage.name);
  const fileName = `${uuid.v4()}${extension}`;
  const folderPath = path.join(__dirname, "../", "uploads/cars", fileName);
  req.files.carImage.mv(folderPath, function (err) {
    if (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: err });
    }
  });
  req.body.path = fileName;
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

module.exports = {
  create,
  list,
  update,
  deleted,
  getById,
};
