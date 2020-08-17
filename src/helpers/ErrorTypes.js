const ErrorTypes = {
  G000: { code: 'G000', message: 'Ocorreu um erro inesperado e não tratado.' },
  U001: { code: 'U001', message: 'O e-mail informado já foi utilizado. Informe outro e-mail ou recupere sua senha.' },
  U002: { code: 'U002', message: 'O CPF informado já foi utilizado.' },
  U003: { code: 'U003', message: 'Preencha todos os campos obrigatórios' },
  U004: { code: 'U004', message: 'Usuário e/ou senha inválidos.' },
  U005: { code: 'U005', message: 'Usuário não encontrado.' },
  U006: { code: 'U006', message: 'Usuário inexistente ou desativado.' },
  C001: { code: 'C001', message: 'Preencha todos os campos obrigatórios.' },
  C002: { code: 'C002', message: 'Conteúdo não encontrado.' },
  F001: { code: 'F001', message: 'Preencha todos os campos obrigatórios.' },
  F002: { code: 'F002', message: 'Formulário não encontrado.' },
}

module.exports = ErrorTypes;
