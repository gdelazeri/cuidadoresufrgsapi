const ErrorTypes = {
  U000: { code: 'U000', message: 'Ocorreu um erro inesperado' },
  U001: { code: 'U001', message: 'O e-mail informado já foi utilizado. Informe outro ou recupere sua senha.' },
  U002: { code: 'U002', message: 'O CPF informado já foi utilizado.' },
  U003: { code: 'U003', message: 'Preencha todos os campos obrigatórios' },
  U004: { code: 'U004', message: 'Usuário não encontrado.' },
}

module.exports = ErrorTypes;
