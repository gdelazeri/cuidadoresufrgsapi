const FormTypes = require('../helpers/FormTypes');
const { response } = require('express');

class FormCalculator {
  constructor(form, answers) {
    this.form = form;
    this.answers = answers;
  }

  calculate() {
    if (this.form && this.form.domains && Array.isArray(this.form.domains)) {
      switch (this.form.type) {
        case FormTypes.AVG_ANSWERS_DOMAIN:
          return this.calculateAvgAnswersDomain();
      }  
    }
    return [];
  }

  calculateAvgAnswersDomain() {
    try {
      const result = [];
      for (let i = 0; i < this.form.domains.length; i += 1) {
        if (Array.isArray(this.form.domains[i].questions)) {
          const questions = this.answers.questions.filter((q, idx) => this.form.domains[i].questions.includes(idx));
          const sum = questions.reduce((total, item) => total + parseInt(item.value, 10), 0);
          result.push({
            title: this.form.domains[i].title,
            text: this.form.domains[i].text,
            imageUrl: this.form.domains[i].imageUrl,
            value: sum / questions.length,
          });
        }
      }
      return result;
    } catch (e) {
      return [];
    }
  }
}

module.exports = FormCalculator;
