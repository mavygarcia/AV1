# Aerocode — Sistema de Gestão de Produção de Aeronaves

Sistema CLI desenvolvido em TypeScript para gerenciar o processo completo de produção de aeronaves, desde o cadastro inicial até a entrega final ao cliente.

---



## Instalação

```bash
# Clone ou extraia o projeto na sua máquina
cd aerocode

# Instale as dependências
npm install
```

---

## Como executar

```bash

npm run dev


npm run build
npm start
```

---

## Login padrão

Na primeira execução, o sistema cria automaticamente um administrador:

| Campo   | Valor     |
|---------|-----------|
| Usuário | admin     |
| Senha   | admin123  |

---

## Estrutura do projeto

```
aerocode/
├── src/
│   ├── index.ts                  # Ponto de entrada e menus
│   ├── enums.ts                  # Enumerações do sistema
│   ├── models/
│   │   ├── Aeronave.ts           # Classe Aeronave
│   │   ├── Peca.ts               # Classe Peça
│   │   ├── Etapa.ts              # Classe Etapa
│   │   ├── Funcionario.ts        # Classe Funcionário
│   │   ├── Teste.ts              # Classe Teste
│   │   └── Relatorio.ts          # Classe Relatório
│   ├── services/
│   │   └── AuthService.ts        # Autenticação e permissões
│   └── utils/
│       └── input.ts              # Leitura de entrada do terminal
├── dados/                        # Gerado automaticamente
│   ├── aeronaves.txt
│   ├── funcionarios.txt
│   └── relatorio_*.txt
├── test.ts                       # Script de testes
├── package.json
└── tsconfig.json
```

---

## Funcionalidades

### Gestão de Aeronaves
- Cadastrar aeronave com código único, modelo, tipo, capacidade e alcance
- Listar todas as aeronaves cadastradas
- Ver detalhes completos de uma aeronave

### Gestão de Funcionários
- Cadastrar funcionários com nome, telefone, endereço, usuário e senha
- Definir nível de permissão: Administrador, Engenheiro ou Operador
- Listar todos os funcionários

### Gestão de Peças
- Adicionar peças a uma aeronave com nome, tipo e fornecedor
- Acompanhar o status da peça: Em Produção → Em Transporte → Pronta

### Gestão de Etapas
- Adicionar etapas de produção com nome e prazo
- Iniciar e finalizar etapas seguindo ordem lógica obrigatória
- Associar funcionários responsáveis a cada etapa

### Gestão de Testes
- Registrar testes elétricos, hidráulicos e aerodinâmicos
- Marcar resultado como Aprovado ou Reprovado

### Relatório de Entrega
- Gerar relatório completo com dados da aeronave, peças, etapas e testes
- Salvar relatório em arquivo de texto na pasta `dados/`

---

## Níveis de permissão

| Nível          | Pode cadastrar funcionários | Pode cadastrar aeronaves | Acesso geral |
|----------------|-----------------------------|--------------------------|--------------|
| Administrador  | Sim                         | Sim                      | Sim          |
| Engenheiro     | Não                         | Sim                      | Sim          |
| Operador       | Não                         | Não                      | Sim          |

---

## Persistência de dados

Todos os dados são salvos automaticamente em arquivos de texto na pasta `dados/` ao encerrar o sistema ou realizar alterações. Os dados são carregados automaticamente na próxima execução.

---





