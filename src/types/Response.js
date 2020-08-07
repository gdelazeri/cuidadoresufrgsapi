class Response {
  constructor(result, errors) {
    this.success = false;
    this.errors = null;
    this.result = null;

    if (errors !== null && errors !== undefined) {
      this.errors = !Array.isArray(errors) ? [errors] : errors;
    }
    if (result !== null && result !== undefined) {
      this.result = result;
    }
  }
}

module.exports = Response;
