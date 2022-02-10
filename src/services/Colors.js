const color = require("../models/Color");
const BaseService = require("./BaseService");

class ColorService extends BaseService {
  constructor() {
    super(color);
  }
}

module.exports = new ColorService();
