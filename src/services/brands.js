const brand = require("../models/Brand");
const BaseService = require("./BaseService");

class BrandService extends BaseService {
  constructor() {
    super(brand);
  }
}

module.exports = new BrandService();
