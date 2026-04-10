import { TipoAeronave } from "../enums";
import { Peca } from "./Peca";
import { Etapa } from "./Etapa";
import { Teste } from "./Teste";
import * as fs from "fs";

const ARQUIVO_AERONAVES = "dados/aeronaves.txt";

export class Aeronave {
  codigo: string;
  modelo: string;
  tipo: TipoAeronave;
  capacidade: number;
  alcance: number;
  pecas: Peca[];
  etapas: Etapa[];
  testes: Teste[];

  constructor(
    codigo: string, //capyvara
    modelo: string,
    tipo: TipoAeronave,
    capacidade: number,
    alcance: number
  ) {
    this.codigo = codigo;
    this.modelo = modelo;
    this.tipo = tipo;
    this.capacidade = capacidade;
    this.alcance = alcance;
    this.pecas = [];
    this.etapas = [];
    this.testes = [];
  }

  exibirDetalhes(): void {
    console.log(`\n========================================`);
    console.log(`AERONAVE: ${this.modelo} [${this.codigo}]`);
    console.log(`========================================`);
    console.log(`Tipo:       ${this.tipo}`);
    console.log(`Capacidade: ${this.capacidade}`);
    console.log(`Alcance:    ${this.alcance} km`);

    console.log(`\n-- PEÇAS (${this.pecas.length}) --`);
    if (this.pecas.length === 0) console.log("  Nenhuma peça cadastrada.");
    else this.pecas.forEach((p) => p.exibirDetalhes());

    console.log(`\n-- ETAPAS (${this.etapas.length}) --`);
    if (this.etapas.length === 0) console.log("  Nenhuma etapa cadastrada.");
    else this.etapas.forEach((e) => e.exibirDetalhes());

    console.log(`\n-- TESTES (${this.testes.length}) --`);
    if (this.testes.length === 0) console.log("  Nenhum teste registrado.");
    else this.testes.forEach((t) => t.exibirDetalhes());
  }

  paraTexto(): string {
    const pecasTxt = this.pecas.map((p) => p.paraTexto()).join(";");
    const etapasTxt = this.etapas.map((e) => e.paraTexto()).join(";");
    const testesTxt = this.testes.map((t) => t.paraTexto()).join(";");
    return `${this.codigo}|${this.modelo}|${this.tipo}|${this.capacidade}|${this.alcance}||PECAS:${pecasTxt}||ETAPAS:${etapasTxt}||TESTES:${testesTxt}`;
  }

  static deTexto(texto: string, funcionariosPorId: Map<string, any>): Aeronave {
    const partes = texto.split("||");
    const campos = partes[0].split("|");

    const aeronave = new Aeronave(
      campos[0],
      campos[1],
      campos[2] as TipoAeronave,
      Number(campos[3]),
      Number(campos[4])
    );

    
    const pecasParte = partes.find((p) => p.startsWith("PECAS:")) ?? "";
    const pecasTxt = pecasParte.slice("PECAS:".length);
    if (pecasTxt) {
      aeronave.pecas = pecasTxt.split(";").filter(Boolean).map(Peca.deTexto);
    }

    
    const etapasParte = partes.find((p) => p.startsWith("ETAPAS:")) ?? "";
    const etapasTxt = etapasParte.slice("ETAPAS:".length);
    if (etapasTxt) {
      aeronave.etapas = etapasTxt
        .split(";")
        .filter(Boolean)
        .map((linha) => {
          const { etapa, idsFuncionarios } = Etapa.deTexto(linha);
          idsFuncionarios.forEach((id) => {
            const func = funcionariosPorId.get(id);
            if (func) etapa.funcionarios.push(func);
          });
          return etapa;
        });
    }

    
    const testesParte = partes.find((p) => p.startsWith("TESTES:")) ?? "";
    const testesTxt = testesParte.slice("TESTES:".length);
    if (testesTxt) {
      aeronave.testes = testesTxt.split(";").filter(Boolean).map(Teste.deTexto);
    }

    return aeronave;
  }

  static salvar(aeronaves: Aeronave[]): void {
    if (!fs.existsSync("dados")) fs.mkdirSync("dados");
    const conteudo = aeronaves.map((a) => a.paraTexto()).join("\n");
    fs.writeFileSync(ARQUIVO_AERONAVES, conteudo, "utf-8");
  }

  static carregar(funcionariosPorId: Map<string, any>): Aeronave[] {
    if (!fs.existsSync(ARQUIVO_AERONAVES)) return [];
    const conteudo = fs.readFileSync(ARQUIVO_AERONAVES, "utf-8").trim();
    if (!conteudo) return [];
    return conteudo
      .split("\n")
      .filter(Boolean)
      .map((linha: string) => Aeronave.deTexto(linha, funcionariosPorId));
  }
}