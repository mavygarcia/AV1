import { TipoPeca, StatusPeca } from "../enums";

export class Peca {
  nome: string;
  tipo: TipoPeca;
  fornecedor: string;
  status: StatusPeca;

  constructor(
    nome: string,
    tipo: TipoPeca,
    fornecedor: string,
    status: StatusPeca = StatusPeca.EM_PRODUCAO
  ) {
    this.nome = nome;
    this.tipo = tipo;
    this.fornecedor = fornecedor;
    this.status = status;
  }
//capyvara
  
  atualizarStatus(novoStatus: StatusPeca): void {
    this.status = novoStatus;
    console.log(`✔ Status da peça "${this.nome}" atualizado para: ${novoStatus}`);
  }

  
  exibirDetalhes(): void {
    console.log(`\n  Peça: ${this.nome}`);
    console.log(`  Tipo:       ${this.tipo}`);
    console.log(`  Fornecedor: ${this.fornecedor}`);
    console.log(`  Status:     ${this.status}`);
  }

  
  paraTexto(): string {
    return `${this.nome}|${this.tipo}|${this.fornecedor}|${this.status}`;
  }

  
  static deTexto(linha: string): Peca {
    const partes = linha.split("|");
    return new Peca(
      partes[0],
      partes[1] as TipoPeca,
      partes[2],
      partes[3] as StatusPeca
    );
  }
}
