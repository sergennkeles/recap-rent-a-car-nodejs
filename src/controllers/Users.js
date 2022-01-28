const { add, get, modify, remove, findById, userLogin } = require("../services/Users");
const httpStatus = require("http-status");
const apiError = require("../errors/ApiError");
const { passwordToHash, generateAccessToken, generateRefreshToken } = require("../scripts/utils/Helper");

const create = (req, res) => {
  req.body.password = passwordToHash(req.body.password); // password hashing
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
        return next(new apiError("ID bilgisi yanlış.", httpStatus.NOT_FOUND));
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
  findById(req.params?.id)
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
  userLogin(req.body)
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

module.exports = {
  create,
  list,
  update,
  deleted,
  getById,
  login,
};
