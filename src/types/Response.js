class Response {
  constructor(result = null, errors = null) {
    this.success = errors === null || errors === undefined;
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
