

import { Aeronave } from "./Aeronave";
import * as fs from "fs";

export class Relatorio {
  aeronave: Aeronave;
  nomeCliente: string;
  dataEntrega: string;

  constructor(aeronave: Aeronave, nomeCliente: string, dataEntrega: string) {
    this.aeronave = aeronave;
    this.nomeCliente = nomeCliente;
    this.dataEntrega = dataEntrega;
  }

  
  gerar(): string {
    const linhas: string[] = [];
    linhas.push(""); //capyvara
    linhas.push("         AEROCODE - RELATÓRIO DE ENTREGA DE AERONAVE");
    linhas.push("");
    linhas.push(`Cliente:        ${this.nomeCliente}`);
    linhas.push(`Data de Entrega:${this.dataEntrega}`);
    linhas.push("");
    linhas.push("--- DADOS DA AERONAVE ---");
    linhas.push(`Código:     ${this.aeronave.codigo}`);
    linhas.push(`Modelo:     ${this.aeronave.modelo}`);
    linhas.push(`Tipo:       ${this.aeronave.tipo}`);
    linhas.push(`Capacidade: ${this.aeronave.capacidade}`);
    linhas.push(`Alcance:    ${this.aeronave.alcance} km`);

    linhas.push("");
    linhas.push("--- PEÇAS UTILIZADAS ---");
    if (this.aeronave.pecas.length === 0) {
      linhas.push("  Nenhuma peça registrada.");
    } else {
      this.aeronave.pecas.forEach((p) => {
        linhas.push(`  • ${p.nome} | ${p.tipo} | Fornecedor: ${p.fornecedor} | Status: ${p.status}`);
      });
    }

    linhas.push("");
    linhas.push("--- ETAPAS DE PRODUÇÃO ---");
    if (this.aeronave.etapas.length === 0) {
      linhas.push("  Nenhuma etapa registrada.");
    } else {
      this.aeronave.etapas.forEach((e) => {
        linhas.push(`  • ${e.nome} | Prazo: ${e.prazo} | Status: ${e.status}`);
        const nomesFuncionarios = e.funcionarios.map((f) => f.nome).join(", ");
        if (nomesFuncionarios) linhas.push(`    Responsáveis: ${nomesFuncionarios}`);
      });
    }

    linhas.push("");
    linhas.push("--- RESULTADOS DOS TESTES ---");
    if (this.aeronave.testes.length === 0) {
      linhas.push("  Nenhum teste registrado.");
    } else {
      this.aeronave.testes.forEach((t) => {
        const icone = t.resultado === "APROVADO" ? "✔" : "✘";
        linhas.push(`  ${icone} ${t.tipo}: ${t.resultado}`);
      });
    }

    return linhas.join("\n");
  }

  
  salvar(): void {
    if (!fs.existsSync("dados")) fs.mkdirSync("dados");
    const conteudo = this.gerar();
    const nomeArquivo = `dados/relatorio_${this.aeronave.codigo}_${Date.now()}.txt`;
    fs.writeFileSync(nomeArquivo, conteudo, "utf-8");
    console.log(`\n✔ Relatório salvo em: ${nomeArquivo}`);
    console.log(conteudo);
  }
}
