import { PrismaClient } from '@prisma/client';
import { withOptimize } from '@prisma/extension-optimize';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
  }).$extends(withOptimize({ apiKey: process.env.PRISMA_OPTIMIZE_API_KEY ?? '' }));

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
