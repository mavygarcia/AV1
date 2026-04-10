# Aerocode — Sistema de Gestão de Produção de Aeronaves

Sistema CLI desenvolvido em TypeScript para gerenciar o processo completo de produção de aeronaves, desde o cadastro inicial até a entrega final ao cliente.

---



## Instalação

```bash
# Clone ou extraia o projeto na sua máquina
cd AV1

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
AV1/
├── src/
│   ├── index.ts                  
│   ├── enums.ts                  
│   ├── models/
│   │   ├── Aeronave.ts           
│   │   ├── Peca.ts               
│   │   ├── Etapa.ts              
│   │   ├── Funcionario.ts        
│   │   ├── Teste.ts              
│   │   └── Relatorio.ts          
│   ├── services/
│   │   └── AuthService.ts        
│   └── utils/
│       └── input.ts              
├── dados/                        
│   ├── aeronaves.txt
│   ├── funcionarios.txt
│   └── relatorio_*.txt
├── test.ts                       
├── package.json
└── tsconfig.json
```
---


## Persistência de dados

Todos os dados são salvos automaticamente em arquivos de texto na pasta `dados/` ao encerrar o sistema ou realizar alterações. Os dados são carregados automaticamente na próxima execução.

---





