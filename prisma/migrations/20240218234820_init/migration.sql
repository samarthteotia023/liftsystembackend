/*
  Warnings:

  - You are about to drop the `Lift` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Lift";

-- CreateTable
CREATE TABLE "lift" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "currentfloor" INTEGER NOT NULL DEFAULT 0,
    "maintenance" BOOLEAN NOT NULL DEFAULT false,
    "state" TEXT NOT NULL DEFAULT 'idle',

    CONSTRAINT "lift_pkey" PRIMARY KEY ("id")
);
