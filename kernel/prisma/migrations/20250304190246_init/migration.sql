-- CreateTable
CREATE TABLE "Deb" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "type" TEXT NOT NULL DEFAULT 'debit',
    "currency" TEXT NOT NULL DEFAULT 'RUB',
    "closedAt" TIMESTAMP(3),

    CONSTRAINT "Deb_pkey" PRIMARY KEY ("id")
);
