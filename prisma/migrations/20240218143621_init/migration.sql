-- CreateTable
CREATE TABLE "Lift" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "currentfloor" INTEGER NOT NULL,
    "maintenance" BOOLEAN NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "Lift_pkey" PRIMARY KEY ("id")
);
