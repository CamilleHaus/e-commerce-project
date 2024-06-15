import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = client
}

export default client;

// Resumo do Processo
// 1. Importa o PrismaClient do pacote @prisma/client.
// 2. Declara uma variável global prisma que pode ser PrismaClient ou undefined.
// 3. Cria uma instância client reutilizando a instância global existente, se houver, ou criando uma nova.
// 4. Em ambientes não-produtivos, armazena a instância client na variável global prisma.
// 5. Exporta a instância client para uso em outros módulos.


// Basicamente esse trecho de coódigo previne a criação de múltuplas instancias do Prisma. 
// O que evita problemas de desempenho futuros