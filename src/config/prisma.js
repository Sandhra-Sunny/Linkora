// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// module.exports = prisma;

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ["error", "warn"], // optional
});

module.exports = prisma;