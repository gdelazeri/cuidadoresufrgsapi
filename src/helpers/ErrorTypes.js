const ErrorTypes = {
  // Generic error
  G000: { code: 'G000', message: 'Ocorreu um erro inesperado e não tratado.' },

  // User error
  U001: { code: 'U001', message: 'O e-mail informado já foi utilizado. Informe outro e-mail ou recupere sua senha.' },
  U002: { code: 'U002', message: 'O CPF informado já foi utilizado.' },
  U003: { code: 'U003', message: 'Preencha todos os campos obrigatórios' },
  U004: { code: 'U004', message: 'Usuário e/ou senha inválidos.' },
  U005: { code: 'U005', message: 'Usuário não encontrado.' },
  U006: { code: 'U006', message: 'Usuário inexistente ou desativado.' },
  U007: { code: 'U007', message: 'Código de verificação expirado.' },
  U008: { code: 'U008', message: 'Código de verificação inválido.' },
  U009: { code: 'U009', message: 'A senha informada não respeita os critérios de segurança.' },
  
  // Content error
  C001: { code: 'C001', message: 'Preencha todos os campos obrigatórios.' },
  C002: { code: 'C002', message: 'Conteúdo não encontrado.' },
  
  // Form error
  F001: { code: 'F001', message: 'Preencha todos os campos obrigatórios.' },
  F002: { code: 'F002', message: 'Formulário não encontrado.' },
  
  // Answer error
  A001: { code: 'A001', message: 'Preencha todos os campos obrigatórios.' },
  A002: { code: 'A002', message: 'Resposta não encontrada.' },
}

module.exports = ErrorTypes;
