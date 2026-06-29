/*
  Warnings:

  - Made the column `scheduleId` on table `ClassSession` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ClassSession" DROP CONSTRAINT "ClassSession_scheduleId_fkey";

-- AlterTable
ALTER TABLE "ClassSession" ALTER COLUMN "scheduleId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ClassSession" ADD CONSTRAINT "ClassSession_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "ClassSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
