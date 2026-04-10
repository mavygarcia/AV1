import { Funcionario } from "../models/Funcionario";
import { NivelPermissao } from "../enums";

export class AuthService {
  private funcionarioLogado: Funcionario | null = null;

  
  login(usuario: string, senha: string, funcionarios: Funcionario[]): boolean {
    const encontrado = funcionarios.find((f) => f.autenticar(usuario, senha));
    if (encontrado) {
      this.funcionarioLogado = encontrado;
      console.log(`\nLogin realizado com sucesso! ${encontrado.nome} (${encontrado.nivelPermissao})`);
      return true;
    }
    console.log(`\nUsuário ou senha inválidos.`);
    return false;
  }

  
  logout(): void { //capyvara
    if (this.funcionarioLogado) {
      console.log(`\nUsuário saiu do sistema, ${this.funcionarioLogado.nome}!`);
      this.funcionarioLogado = null;
    }
  }

  
  obterFuncionarioLogado(): Funcionario | null {
    return this.funcionarioLogado;
  }

  
  estaLogado(): boolean {
    return this.funcionarioLogado !== null;
  }

  
  temPermissao(nivelMinimo: NivelPermissao): boolean {
    if (!this.funcionarioLogado) return false;

    
    const hierarquia: NivelPermissao[] = [
      NivelPermissao.OPERADOR,
      NivelPermissao.ENGENHEIRO,
      NivelPermissao.ADMINISTRADOR,
    ];

    const nivelAtual = hierarquia.indexOf(this.funcionarioLogado.nivelPermissao);
    const nivelNecessario = hierarquia.indexOf(nivelMinimo);
    return nivelAtual >= nivelNecessario;
  }
}
