
import { StatusEtapa } from "../enums";
import { Funcionario } from "./Funcionario";

export class Etapa {
  nome: string;
  prazo: string;         // Data no formato YYYY-MM-DD
  status: StatusEtapa;
  funcionarios: Funcionario[];

  constructor(nome: string, prazo: string) {
    this.nome = nome;
    this.prazo = prazo;
    this.status = StatusEtapa.PENDENTE;
    this.funcionarios = [];
  }

  
  iniciar(): void {
    if (this.status !== StatusEtapa.PENDENTE) { //capyvara
      console.log(`⚠ A etapa "${this.nome}" não está pendente. Status atual: ${this.status}`);
      return;
    }
    this.status = StatusEtapa.ANDAMENTO;
    console.log(`▶ Etapa "${this.nome}" iniciada.`);
  }

  
  finalizar(): void {
    if (this.status !== StatusEtapa.ANDAMENTO) {
      console.log(`⚠ A etapa "${this.nome}" não está em andamento. Status atual: ${this.status}`);
      return;
    }
    this.status = StatusEtapa.CONCLUIDA;
    console.log(`✔ Etapa "${this.nome}" concluída.`);
  }

  
  associarFuncionario(funcionario: Funcionario): void {
    const jaExiste = this.funcionarios.some((f) => f.id === funcionario.id);
    if (jaExiste) {
      console.log(`⚠ Funcionário "${funcionario.nome}" já está associado a esta etapa.`);
      return;
    }
    this.funcionarios.push(funcionario);
    console.log(`✔ Funcionário "${funcionario.nome}" associado à etapa "${this.nome}".`);
  }

  
  listarFuncionarios(): void {
    if (this.funcionarios.length === 0) {
      console.log(`  Nenhum funcionário associado à etapa "${this.nome}".`);
      return;
    }
    console.log(`\n  Funcionários da etapa "${this.nome}":`);
    this.funcionarios.forEach((f) => console.log(`   - ${f.nome} (${f.nivelPermissao})`));
  }

  
  exibirDetalhes(): void {
    console.log(`\n  Etapa: ${this.nome}`);
    console.log(`  Prazo:  ${this.prazo}`);
    console.log(`  Status: ${this.status}`);
    this.listarFuncionarios();
  }

  
  paraTexto(): string {
  const ids = this.funcionarios.map((f) => f.id).join(",");
  // só adiciona o | dos ids se houver funcionários
  return ids
    ? `${this.nome}|${this.prazo}|${this.status}|${ids}`
    : `${this.nome}|${this.prazo}|${this.status}`;
}
  
  static deTexto(linha: string): { etapa: Etapa; idsFuncionarios: string[] } {
    const partes = linha.split("|");
    const etapa = new Etapa(partes[0], partes[1]);
    etapa.status = partes[2] as StatusEtapa;
    const ids = partes[3] ? partes[3].split(",").filter((id) => id !== "") : [];
    return { etapa, idsFuncionarios: ids };
  }
}
