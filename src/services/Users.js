const user = require("../models/User");
const BaseService = require("./BaseService");

class UserService extends BaseService {
  constructor() {
    super(user);
  }

  findOne(where) {
    return user.findOne(where);
  }
}

module.exports = new UserService();
