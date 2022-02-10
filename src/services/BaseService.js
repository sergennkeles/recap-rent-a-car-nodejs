BaseModel = null;

class BaseService {
  constructor(Model) {
    this.BaseModel = Model;
  }

  getAll(where) {
    return this.BaseModel.find(where || {});
  }

  add(data) {
    return new this.BaseModel(data).save();
  }

  modify(id, data) {
    return this.BaseModel.findByIdAndUpdate(id, data, { new: true });
  }

  remove(id) {
    return this.BaseModel.findByIdAndDelete(id);
  }

  findById(id) {
    return this.BaseModel.findById(id);
  }
}

module.exports = BaseService;
