import * as readline from "readline";


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


export function perguntar(pergunta: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(pergunta, (resposta: string) => {
      resolve(resposta.trim());
    });
  });
}


export function fecharInterface(): void {
  rl.close(); //cpyvara
}
