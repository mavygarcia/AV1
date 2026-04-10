import { NivelPermissao } from "../enums";
import * as fs from "fs";

const ARQUIVO_FUNCIONARIOS = "dados/funcionarios.txt";

export class Funcionario {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  usuario: string;
  senha: string;
  nivelPermissao: NivelPermissao;

  constructor(
    id: string,
    nome: string,
    telefone: string,
    endereco: string,
    usuario: string, //capyvara
    senha: string,
    nivelPermissao: NivelPermissao
  ) {
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.endereco = endereco;
    this.usuario = usuario;
    this.senha = senha;
    this.nivelPermissao = nivelPermissao;
  }

  
  autenticar(usuario: string, senha: string): boolean {
    return this.usuario === usuario && this.senha === senha;
  }

  
  exibirDetalhes(): void {
    console.log(`\n--- Funcionário ---`);
    console.log(`ID:           ${this.id}`);
    console.log(`Nome:         ${this.nome}`);
    console.log(`Telefone:     ${this.telefone}`);
    console.log(`Endereço:     ${this.endereco}`);
    console.log(`Usuário:      ${this.usuario}`);
    console.log(`Permissão:    ${this.nivelPermissao}`);
  }

  
  paraTexto(): string {
    return `${this.id}|${this.nome}|${this.telefone}|${this.endereco}|${this.usuario}|${this.senha}|${this.nivelPermissao}`;
  }

  
  static deTexto(linha: string): Funcionario {
    const partes = linha.split("|");
    return new Funcionario(
      partes[0],
      partes[1],
      partes[2],
      partes[3],
      partes[4],
      partes[5],
      partes[6] as NivelPermissao
    );
  }

  
  static salvar(funcionarios: Funcionario[]): void {
    if (!fs.existsSync("dados")) fs.mkdirSync("dados");
    const conteudo = funcionarios.map((f) => f.paraTexto()).join("\n");
    fs.writeFileSync(ARQUIVO_FUNCIONARIOS, conteudo, "utf-8");
  }

  
  static carregar(): Funcionario[] {
    if (!fs.existsSync(ARQUIVO_FUNCIONARIOS)) return [];
    const conteudo = fs.readFileSync(ARQUIVO_FUNCIONARIOS, "utf-8").trim();
    if (!conteudo) return [];
    return conteudo.split("\n").map((linha: string) => Funcionario.deTexto(linha));
  }
}
