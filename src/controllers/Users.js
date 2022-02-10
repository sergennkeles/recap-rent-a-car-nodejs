const userService = require("../services/Users");
const httpStatus = require("http-status");
const apiError = require("../errors/ApiError");
const eventEmitter = require("../scripts/events/EventEmitter");
const { passwordToHash, generateAccessToken, generateRefreshToken } = require("../scripts/utils/Helper");

const create = (req, res, next) => {
  userService
    .findOne({ email: req.body.email })
    .then((emailResponse) => {
      if (emailResponse) {
        return next(new apiError("Bu mail adresi ile kayıtlı kullanıcı var", httpStatus.BAD_REQUEST));
      } else {
        req.body.password = passwordToHash(req.body.password); // password hashing
        userService
          .add(req.body)
          .then((response) => {
            console.log(response);
            res.status(httpStatus.OK).send(response);
          })
          .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
          });
      }
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const update = (req, res, next) => {
  userService
    .findOne({ email: req.body.email })
    .then((emailResponse) => {
      if (emailResponse) {
        return next(new apiError("Bu mail adresi ile kayıtlı kullanıcı var", httpStatus.BAD_REQUEST));
      } else {
        userService
          .modify({ _id: req.user?._id }, req.body)
          .then((response) => {
            res.status(httpStatus.OK).send(response);
          })
          .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
          });
      }
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const list = (req, res) => {
  userService
    .getAll()
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const deleted = (req, res, next) => {
  userService
    .remove(req.params?.id)
    .then((response) => {
      if (!response) {
        return next(new apiError("Böyle bir kayıt yok.", httpStatus.NOT_FOUND));
      } else {
        res.status(httpStatus.OK).send({ message: "Kayıt başarılı bir şekilde silinmiştir." });
      }
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const getById = (req, res, next) => {
  userService
    .findOne({ _id: req.params?.id })
    .then((response) => {
      if (!response) {
        return next(new apiError("Böyle bir kayıt yok.", httpStatus.NOT_FOUND));
      } else {
        res.status(httpStatus.OK).send(response);
      }
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const login = (req, res, next) => {
  req.body.password = passwordToHash(req.body.password);
  userService
    .findOne(req.body)
    .then((user) => {
      if (!user) return next(new apiError("Böyle bir kullanıcı yok.", 404));
      user = {
        ...user.toObject(), // toObject ile objeye çevirdik. Aslında user bir obje fakat mongoose üzerinden oluşturduğumuz modelin diğer tüm özelliklerini de dahil ederek gönderiyor.
        // bunun önüne geçmek için toObject'i kullandık.
        tokens: {
          access_token: generateAccessToken(user),
          refresh_token: generateRefreshToken(user),
        },
      };
      delete user.password; // password'ün görüntülenmesine gerek olmadığı için delete ettik.
      res.status(httpStatus.OK).send(user);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const resetPassword = (req, res, next) => {
  const newPassword = `usr-${new Date().getTime()}`;
  console.log(newPassword);
  userService.modify({ email: req.body.email }, { password: passwordToHash(newPassword) })
    .then((response) => {
      if (!response) return next(new apiError("Böyle bir kullanıcı yok."), httpStatus.NOT_FOUND);
      eventEmitter.emit("send", {
        to: response.email,
        subject: "Parola sıfırlama",
        html: `Talebiniz üzerine parola sıfırlama işleminiz gerçekleşmiştir.
        <br/> Sisteme giriş yaptıktan sonra parolanızı değiştirmeyi unutmayın 
        <br/> Yeni parolanız: <b>${newPassword}</b>`,
      });
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const changePassword = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  userService.modify({ _id: req.user?._id }, req.body)
    .then((response) => {
      res.status(httpStatus.OK).send({ message: "Parolanız başarıyla değiştirilmiştir." });
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
  login,
  resetPassword,
  changePassword,
};
