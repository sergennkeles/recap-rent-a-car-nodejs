const customer = require("../models/Customer");
const BaseService = require("./BaseService");

class CustomerService extends BaseService {
  constructor() {
    super(customer);
  }

  getAll(where) {
    return customer.find(where || {}).populate({
      path: "userId",
      select: "firstName, lastName, email",
    });
  }

  findById(id) {
    return customer.findById(id).populate({
      path: "userId",
      select: "firstName, lastName, email",
    });
  }
}

module.exports = new CustomerService();
