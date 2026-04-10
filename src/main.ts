import { Aeronave } from "./models/Aeronave";
import { Funcionario } from "./models/Funcionario";
import { Peca } from "./models/Peca";
import { Etapa } from "./models/Etapa";
import { Teste } from "./models/Teste";
import { Relatorio } from "./models/Relatorio";
import { AuthService } from "./services/AuthService";
import {
  TipoAeronave,
  TipoPeca,
  StatusPeca,
  TipoTeste,
  ResultadoTeste,
  NivelPermissao,
} from "./enums";
import { perguntar, fecharInterface } from "./utils/input";


let funcionarios: Funcionario[] = [];
let aeronaves: Aeronave[] = []; //capyvara
const auth = new AuthService();



function salvarDados(): void {
  Funcionario.salvar(funcionarios);
  Aeronave.salvar(aeronaves);
}

function carregarDados(): void {
  funcionarios = Funcionario.carregar();

  
  const mapFuncionarios = new Map(funcionarios.map((f) => [f.id, f]));
  aeronaves = Aeronave.carregar(mapFuncionarios);

  console.log(` ${funcionarios.length} funcionário(s) e ${aeronaves.length} aeronave(s) carregados.`);
}


async function menuPrincipal(): Promise<void> {
  console.log("\n╔══════════════════════════════╗");
  console.log("║   AEROCODE - MENU PRINCIPAL  ║");
  console.log("╠══════════════════════════════╣");
  console.log("║ 1. Gestão de Aeronaves        ║");
  console.log("║ 2. Gestão de Funcionários     ║");
  console.log("║ 3. Gestão de Peças            ║");
  console.log("║ 4. Gestão de Etapas           ║");
  console.log("║ 5. Gestão de Testes           ║");
  console.log("║ 6. Gerar Relatório de Entrega ║");
  console.log("║ 7. Fazer Logout               ║");
  console.log("║ 0. Sair                       ║");
  console.log("╚══════════════════════════════╝");

  const opcao = await perguntar("Escolha uma opção: ");

  switch(opcao){
    case "1":
      await menuAeronaves();
      break;

    case "2":
      await menuFuncionarios();
      break;
    
    case "3":
      await menuPecas();
      break;
    
    case "4":
      await menuEtapas();
      break;

    case "5":
      await menuTestes();
      break;

    case "6":
      await gerarRelatorio();
      break;

     case "7":
      auth.logout();
      await menuLogin();
      return;

    case "0":
      salvarDados();
      console.log("Fechando Sistema");
      fecharInterface();
      process.exit(0);
      break;

    default:
      console.log("Opção inválida")
  }
 
  await menuPrincipal();
}


async function menuLogin(): Promise<void> {
  console.log("");
  console.log("║   AEROCODE - LOGIN       ║");
  console.log("");

  const usuario = await perguntar("Usuário: ");
  const senha = await perguntar("Senha:   ");

  const sucesso = auth.login(usuario, senha, funcionarios);
  if (!sucesso) {
    const tentar = await perguntar("Tentar novamente? (s/n): ");
    if (tentar.toLowerCase() === "s") await menuLogin();
    else {
      fecharInterface();
      process.exit(0);
    }
  }
}



async function menuAeronaves(): Promise<void> {
  console.log("\n-- Gestão de Aeronaves --");
  console.log("1. Cadastrar aeronave");
  console.log("2. Listar aeronaves");
  console.log("3. Ver detalhes de uma aeronave");
  console.log("0. Voltar");

  const opcao = await perguntar("Opção: ");

  if (opcao === "1") {
    if (!auth.temPermissao(NivelPermissao.ENGENHEIRO)) {
      console.log("Permissão negada. Apenas Engenheiros e Administradores podem cadastrar aeronaves.");
      return;
    }
    const codigo = await perguntar("Código único da aeronave: ");
    const jaExiste = aeronaves.some((a) => a.codigo === codigo);
    if (jaExiste) {
      console.log("Código já cadastrado. Use um código único.");
      return;
    }
    const modelo = await perguntar("Modelo: ");
    console.log(`Tipo: 1-COMERCIAL  2-MILITAR`);
    const tipoOpcao = await perguntar("Tipo: ");
    const tipo = tipoOpcao === "2" ? TipoAeronave.MILITAR : TipoAeronave.COMERCIAL;
    const capacidade = Number(await perguntar("Capacidade (passageiros ou kg): "));
    const alcance = Number(await perguntar("Alcance (km): "));
    





    const nova = new Aeronave(codigo, modelo, tipo, capacidade, alcance);
    aeronaves.push(nova);
    salvarDados();
    console.log(` Aeronave "${modelo}" cadastrada com sucesso!`);

  } else if (opcao === "2") {
    if (aeronaves.length === 0) { console.log("Nenhuma aeronave cadastrada."); return; }
    aeronaves.forEach((a) => console.log(`  • [${a.codigo}] ${a.modelo} - ${a.tipo}`));

  } else if (opcao === "3") {
    const codigo = await perguntar("Código da aeronave: ");
    const aeronave = aeronaves.find((a) => a.codigo === codigo);
    if (!aeronave) { console.log("Aeronave não encontrada."); return; }
    aeronave.exibirDetalhes();
  }
}



async function menuFuncionarios(): Promise<void> {
  console.log("\n-- Gestão de Funcionários --");
  console.log("1. Cadastrar funcionário");
  console.log("2. Listar funcionários");
  console.log("0. Voltar");

  const opcao = await perguntar("Opção: ");

  if (opcao === "1") {
    if (!auth.temPermissao(NivelPermissao.ADMINISTRADOR)) {
      console.log("Apenas Administradores podem cadastrar funcionários.");
      return;
    }
    const id = `F${Date.now()}`;
    const nome = await perguntar("Nome: ");
    const telefone = await perguntar("Telefone: ");
    const endereco = await perguntar("Endereço: ");
    const usuario = await perguntar("Usuário (login): ");
    const senha = await perguntar("Senha: ");
    console.log("Nível: 1-ADMINISTRADOR  2-ENGENHEIRO  3-OPERADOR");
    const nivelOpcao = await perguntar("Nível de permissão: ");
    const nivel =
      nivelOpcao === "1" ? NivelPermissao.ADMINISTRADOR
      : nivelOpcao === "2" ? NivelPermissao.ENGENHEIRO
      : NivelPermissao.OPERADOR;

    const novo = new Funcionario(id, nome, telefone, endereco, usuario, senha, nivel);
    funcionarios.push(novo);
    salvarDados();
    console.log(`Funcionário "${nome}" cadastrado! ID: ${id}`);

  } else if (opcao === "2") {
    if (funcionarios.length === 0) { console.log("Nenhum funcionário cadastrado."); return; }
    funcionarios.forEach((f) => f.exibirDetalhes());
  }
}



async function menuPecas(): Promise<void> {
  console.log("\n-- Gestão de Peças --");
  console.log("1. Adicionar peça a uma aeronave");
  console.log("2. Atualizar status de peça");
  console.log("0. Voltar");

  const opcao = await perguntar("Opção: ");

  if (opcao === "1") {
    const codigo = await perguntar("Código da aeronave: ");
    const aeronave = aeronaves.find((a) => a.codigo === codigo);
    if (!aeronave) { console.log("Aeronave não encontrada."); return; }

    const nome = await perguntar("Nome da peça: ");
    const fornecedor = await perguntar("Fornecedor: ");
    console.log("Tipo: 1-NACIONAL  2-IMPORTADA");
    const tipoOpcao = await perguntar("Tipo: ");
    const tipo = tipoOpcao === "2" ? TipoPeca.IMPORTADA : TipoPeca.NACIONAL;

    const peca = new Peca(nome, tipo, fornecedor);
    aeronave.pecas.push(peca);
    salvarDados();
    console.log(`✔ Peça "${nome}" adicionada à aeronave ${codigo}.`);

  } else if (opcao === "2") {
    const codigo = await perguntar("Código da aeronave: ");
    const aeronave = aeronaves.find((a) => a.codigo === codigo);
    if (!aeronave) { console.log("Aeronave não encontrada."); return; }

    aeronave.pecas.forEach((p, i) => console.log(`  ${i + 1}. ${p.nome} [${p.status}]`));
    const idx = Number(await perguntar("Número da peça: ")) - 1;
    const peca = aeronave.pecas[idx];
    if (!peca) { console.log("Peça não encontrada."); return; }

    console.log("Novo status: 1-EM_PRODUCAO  2-EM_TRANSPORTE  3-PRONTA");
    const statusOpcao = await perguntar("Status: ");
    const novoStatus =
      statusOpcao === "2" ? StatusPeca.EM_TRANSPORTE
      : statusOpcao === "3" ? StatusPeca.PRONTA
      : StatusPeca.EM_PRODUCAO;

    peca.atualizarStatus(novoStatus);
    salvarDados();
  }
}



async function menuEtapas(): Promise<void> {
  console.log("\n-- Gestão de Etapas --");
  console.log("1. Adicionar etapa a uma aeronave");
  console.log("2. Iniciar etapa");
  console.log("3. Finalizar etapa");
  console.log("4. Associar funcionário a etapa");
  console.log("0. Voltar");

  const opcao = await perguntar("Opção: ");
  const codigo = await perguntar("Código da aeronave: ");
  const aeronave = aeronaves.find((a) => a.codigo === codigo);
  if (!aeronave) { console.log("Aeronave não encontrada."); return; }

  if (opcao === "1") {
    const nome = await perguntar("Nome da etapa: ");
    const prazo = await perguntar("Prazo (YYYY-MM-DD): ");
    aeronave.etapas.push(new Etapa(nome, prazo));
    salvarDados();
    console.log(`Etapa "${nome}" adicionada.`);

  } else if (opcao === "2" || opcao === "3") {
    aeronave.etapas.forEach((e, i) => console.log(`  ${i + 1}. ${e.nome} [${e.status}]`));
    const idx = Number(await perguntar("Número da etapa: ")) - 1;
    const etapa = aeronave.etapas[idx];
    if (!etapa) { console.log("✘ Etapa não encontrada."); return; }

    
    if (opcao === "2") {
      if (idx > 0 && aeronave.etapas[idx - 1].status !== "CONCLUIDA") {
        console.log("A etapa anterior ainda não foi concluída.");
        return;
      }
      etapa.iniciar();
    } else {
      etapa.finalizar();
    }
    salvarDados();

  } else if (opcao === "4") {
    aeronave.etapas.forEach((e, i) => console.log(`  ${i + 1}. ${e.nome}`));
    const idx = Number(await perguntar("Número da etapa: ")) - 1;
    const etapa = aeronave.etapas[idx];
    if (!etapa) { console.log("✘ Etapa não encontrada."); return; }

    funcionarios.forEach((f, i) => console.log(`  ${i + 1}. ${f.nome} [${f.nivelPermissao}]`));
    const fIdx = Number(await perguntar("Número do funcionário: ")) - 1;
    const func = funcionarios[fIdx];
    if (!func) { console.log("✘ Funcionário não encontrado."); return; }

    etapa.associarFuncionario(func);
    salvarDados();
  }
}



async function menuTestes(): Promise<void> {
  console.log("\n-- Gestão de Testes --");
  const codigo = await perguntar("Código da aeronave: ");
  const aeronave = aeronaves.find((a) => a.codigo === codigo);
  if (!aeronave) { console.log("✘ Aeronave não encontrada."); return; }

  console.log("Tipo de teste: 1-ELETRICO  2-HIDRAULICO  3-AERODINAMICO");
  const tipoOpcao = await perguntar("Tipo: ");
  const tipo =
    tipoOpcao === "2" ? TipoTeste.HIDRAULICO
    : tipoOpcao === "3" ? TipoTeste.AERODINAMICO
    : TipoTeste.ELETRICO;

  console.log("Resultado: 1-APROVADO  2-REPROVADO");
  const resOpcao = await perguntar("Resultado: ");
  const resultado = resOpcao === "2" ? ResultadoTeste.REPROVADO : ResultadoTeste.APROVADO;

  aeronave.testes.push(new Teste(tipo, resultado));
  salvarDados();
  console.log(`Teste ${tipo} registrado como ${resultado}.`);
}




async function gerarRelatorio(): Promise<void> {
  const codigo = await perguntar("Código da aeronave para relatório: ");
  const aeronave = aeronaves.find((a) => a.codigo === codigo);
  if (!aeronave) { console.log("Aeronave não encontrada."); return; }

  const cliente = await perguntar("Nome do cliente: ");
  const data = await perguntar("Data de entrega (YYYY-MM-DD): ");

  const relatorio = new Relatorio(aeronave, cliente, data);
  relatorio.salvar();
}



async function iniciar(): Promise<void> {
 
  console.log("  AEROCODE - Sistema de Gestão         ");
  console.log("  Produção de Aeronaves v1.0           ");
  console.log("╚════════════════════════════════════════╝");

  carregarDados();


  if (funcionarios.length === 0) {
    console.log("\n Nenhum funcionário encontrado. Criando administrador padrão...");
    const admin = new Funcionario(
      "F0001",
      "Administrador",
      "(00) 00000-0000",
      "Sede Aerocode",
      "admin",
      "admin123",
      NivelPermissao.ADMINISTRADOR
    );
    funcionarios.push(admin);
    salvarDados();
    console.log(" Admin criado! Usuário: admin | Senha: admin123");
  }

  await menuLogin();

  if (auth.estaLogado()) {
    await menuPrincipal();
  }
}


iniciar().catch((err) => {
  console.error("Erro fatal:", err);
  process.exit(1);
});
