import { TipoTeste, ResultadoTeste } from "../enums";

export class Teste {
  tipo: TipoTeste;
  resultado: ResultadoTeste;

  constructor(tipo: TipoTeste, resultado: ResultadoTeste) {
    this.tipo = tipo;
    this.resultado = resultado;
  }

  
  exibirDetalhes(): void {
    const icone = this.resultado === ResultadoTeste.APROVADO 
    console.log(`\n  Teste: ${this.tipo}`);
    console.log(`  Resultado: ${icone} ${this.resultado}`);
  }


  paraTexto(): string { //capyvara
    return `${this.tipo}|${this.resultado}`;
  }

  
  static deTexto(linha: string): Teste {
    const partes = linha.split("|");
    return new Teste(partes[0] as TipoTeste, partes[1] as ResultadoTeste);
  }
}
