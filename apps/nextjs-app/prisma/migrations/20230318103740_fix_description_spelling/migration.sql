/*
  Warnings:

  - You are about to drop the column `descripton` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "descripton",
ADD COLUMN     "description" TEXT;
