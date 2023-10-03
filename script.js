class ContaBancaria {
    constructor(agencia, numero, tipo, saldo) {
      this.agencia = agencia;
      this.numero = numero;
      this.tipo = tipo;
      this.saldo = saldo;
    }

    getSaldo() {
      return this.saldo;
    }

    setSaldo(saldo) {
      this.saldo = saldo;
    }

    sacar(valor) {
      if (valor <= this.saldo) {
        this.saldo -= valor;
        return true;
      }
      return false;
    }

    depositar(valor) {
      this.saldo += valor;
      return true;
    }
  }

  class ContaCorrente extends ContaBancaria {
    constructor(agencia, numero, saldo, cartaoCredito) {
      super(agencia, numero, 'Conta Corrente', saldo);
      this.cartaoCredito = cartaoCredito;
    }

    getCartaoCredito() {
      return this.cartaoCredito;
    }

    setCartaoCredito(cartaoCredito) {
      this.cartaoCredito = cartaoCredito;
    }
  }

  class ContaPoupanca extends ContaBancaria {
    constructor(agencia, numero, saldo) {
      super(agencia, numero, 'Conta Poupança', saldo);
    }
  }

  class ContaUniversitaria extends ContaBancaria {
    constructor(agencia, numero, saldo) {
      super(agencia, numero, 'Conta Universitária', saldo);
    }

    sacar(valor) {
      if (this.tipo === 'Conta Universitária' && valor > 500) {
        return false;
      }
      return super.sacar(valor);
    }
  }

  const contas = [];

  function inserirConta() {
    const agencia = document.getElementById('agencia').value;
    const numero = document.getElementById('numero').value;
    const tipo = document.getElementById('tipo').value;
    const saldo = parseFloat(document.getElementById('saldo').value);

    if (!agencia || !numero || !tipo || isNaN(saldo)) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    let novaConta;
    if (tipo === 'Conta Corrente') {
      const cartaoCredito = confirm('Essa conta possui cartão de crédito?');
      novaConta = new ContaCorrente(agencia, numero, saldo, cartaoCredito);
    } else if (tipo === 'Conta Poupança') {
      novaConta = new ContaPoupanca(agencia, numero, saldo);
    } else if (tipo === 'Conta Universitária') {
      novaConta = new ContaUniversitaria(agencia, numero, saldo);
    }

    contas.push(novaConta);
    alert('Conta inserida com sucesso.');
  }

  function deletarConta() {
    const index = prompt('Digite o índice da conta que deseja deletar:');
    if (index === null || index === '') {
      return;
    }

    const parsedIndex = parseInt(index);
    if (isNaN(parsedIndex) || parsedIndex < 0 || parsedIndex >= contas.length) {
      alert('Índice inválido.');
      return;
    }

    contas.splice(parsedIndex, 1);
    alert('Conta deletada com sucesso.');
  }

  function visualizarContas() {
    const contasDiv = document.getElementById('contas');
    contasDiv.innerHTML = '';

    if (contas.length === 0) {
      contasDiv.innerText = 'Nenhuma conta cadastrada.';
      return;
    }

    contas.forEach((conta, index) => {
      const contaInfo = `Número: ${index} Agência: ${conta.agencia}, Número: ${conta.numero}, Tipo: ${conta.tipo}, Saldo: ${conta.saldo}`;
      const p = document.createElement('p');
      p.innerText = contaInfo;
      contasDiv.appendChild(p);
    });
  }
