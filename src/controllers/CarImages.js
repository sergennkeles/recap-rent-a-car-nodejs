const carImageService = require("../services/CarImages");
const httpStatus = require("http-status");
const apiError = require("../errors/ApiError");
const path = require("path");
const uuid = require("uuid");
const fs = require("fs");

const create = (req, res) => {
  if (!req?.files?.carImage) {
    return res.status(httpStatus.BAD_REQUEST).send({ error: "Lütfen bir resim seçin" });
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
  carImageService.add(req.body)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const update = (req, res, next) => {
  carImageService.getAll({ _id: req.params?.id })
    .then((imageResponse) => {
      if (!req?.files?.carImage) {
        return res.status(httpStatus.BAD_REQUEST).send({ error: "Lütfen bir resim seçin" });
      }
      if (imageResponse.length == 0) {
        return next(new apiError("Hatalı ID bilgisi", httpStatus.NOT_FOUND));
      }
      const fileName = `${imageResponse[0].path}`;
      const folderPath = path.join(__dirname, "../", "uploads/cars", fileName);
      req.files.carImage.mv(folderPath, function (err) {
        if (err) {
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: err });
        }
      });
      req.body.path = fileName;
     carImageService.modify(req.params?.id, req.body)
       .then((response) => {
         res.status(httpStatus.OK).send(response);
       })
       .catch((e) => {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
       });
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const list = (req, res) => {
  carImageService.getAll()
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const deleted = (req, res, next) => {
  carImageService.remove(req.params?.id)
    .then((response) => {
      const removePath = path.join(__dirname, "../", `uploads/cars/${response.path}`);
      if (!response) {
        return next(new apiError("Böyle bir kayıt yok", httpStatus.NOT_FOUND));
      } else {
        fs.unlink(removePath, (err) => {
          if (err) {
            return next(new apiError("Resim silinmiş zaten", httpStatus.NOT_FOUND));
          }
          res.status(httpStatus.OK).send({ message: "Kayıt başarılı bir şekilde silinmiştir." });
        });
      }
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const getById = (req, res, next) => {
  carImageService.findById(req.params?.id)
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
