/**
 * Code retrieved from Samueljh1 at https://github.com/prisma/prisma/issues/5139
 */
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

if (!global.prisma) {
  global.prisma = new PrismaClient();
}

// export default global.prisma;
