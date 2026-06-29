-- Drop foreign keys first
ALTER TABLE "ClassSession" DROP CONSTRAINT "ClassSession_scheduleId_fkey";
ALTER TABLE "ClassSession" DROP CONSTRAINT "ClassSession_instructorId_fkey";
ALTER TABLE "ClassSchedule" DROP CONSTRAINT "ClassSchedule_instructorId_fkey";
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_memberId_fkey";
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_sessionId_fkey";
ALTER TABLE "Promotion" DROP CONSTRAINT "Promotion_memberId_fkey";
ALTER TABLE "Promotion" DROP CONSTRAINT "Promotion_instructorId_fkey";

-- Alter id columns to UUID with db-level default (no drop/recreate)
ALTER TABLE "User" ALTER COLUMN "id" SET DATA TYPE UUID USING "id"::UUID, ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
ALTER TABLE "Promotion" ALTER COLUMN "id" SET DATA TYPE UUID USING "id"::UUID, ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
ALTER TABLE "Promotion" ALTER COLUMN "memberId" SET DATA TYPE UUID USING "memberId"::UUID;
ALTER TABLE "Promotion" ALTER COLUMN "instructorId" SET DATA TYPE UUID USING "instructorId"::UUID;
ALTER TABLE "ClassSchedule" ALTER COLUMN "id" SET DATA TYPE UUID USING "id"::UUID, ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
ALTER TABLE "ClassSchedule" ALTER COLUMN "instructorId" SET DATA TYPE UUID USING "instructorId"::UUID;
ALTER TABLE "ClassSession" ALTER COLUMN "id" SET DATA TYPE UUID USING "id"::UUID, ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
ALTER TABLE "ClassSession" ALTER COLUMN "scheduleId" SET DATA TYPE UUID USING "scheduleId"::UUID;
ALTER TABLE "ClassSession" ALTER COLUMN "instructorId" SET DATA TYPE UUID USING "instructorId"::UUID;
ALTER TABLE "Attendance" ALTER COLUMN "id" SET DATA TYPE UUID USING "id"::UUID, ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
ALTER TABLE "Attendance" ALTER COLUMN "memberId" SET DATA TYPE UUID USING "memberId"::UUID;
ALTER TABLE "Attendance" ALTER COLUMN "sessionId" SET DATA TYPE UUID USING "sessionId"::UUID;

-- Recreate foreign keys
ALTER TABLE "ClassSchedule" ADD CONSTRAINT "ClassSchedule_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ClassSession" ADD CONSTRAINT "ClassSession_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "ClassSchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ClassSession" ADD CONSTRAINT "ClassSession_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ClassSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;