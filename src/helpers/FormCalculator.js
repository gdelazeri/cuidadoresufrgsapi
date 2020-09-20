const FormTypes = require('../helpers/FormTypes');

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
    return [{
      title: 'Obrigado por responder o questionário!',
      text: '',
    }];
  }

  calculateAvgAnswersDomain() {
    try {
      const result = [];
      for (let i = 0; i < this.form.domains.length; i += 1) {
        if (Array.isArray(this.form.domains[i].questions)) {
          const questions = this.answers.questions.filter((q, idx) => this.form.domains[i].questions.includes(idx));
          const sum = questions.reduce((total, item) => total + parseInt(item.value, 10), 0);
          const value = sum / questions.length;
          const classification = this.form.classification.find(c => value >= c.min && value <= c.max);
          result.push({
            title: this.form.domains[i].title,
            text: this.form.domains[i].text,
            classification: classification ? classification.label : null,
            imageUrl: this.form.domains[i].imageUrl,
          });
        }
      }
      return result;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = FormCalculator;
