-- CreateTable
CREATE TABLE "TodoItem" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "descripton" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TodoItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "limitedTODOs" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
