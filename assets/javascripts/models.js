class Model {
  constructor(data) {
    this.name = data.name
  }

  route() {
    "/${this.name}"
  }
}

class Models {
  constructor(data) {
    this.models = data.map(m => new Model(m))
  }

  find(name) {
    return this.models.find(m => m.name == name)
  }

  routes() {
    
  }
}

export default Models
