const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Excluir todos os registros das coleções
  await prisma.user.deleteMany()

  // Adicione mais exclusões para outras coleções conforme necessário

  console.log('Database has been reset.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });