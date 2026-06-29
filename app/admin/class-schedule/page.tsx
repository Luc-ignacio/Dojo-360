// import { UsersIcon, TrendingUpIcon, DollarSignIcon } from "lucide-react";
import { getUsers } from "@/app/actions/user";
import CreateClassSchedule from "@/components/Class/CreateSchedule";
import { getClassSchedules } from "@/app/actions/classSchedule";
import { ClassSchedulesTable } from "@/components/Tables/ClassSchedulesTable";

export default async function ClassSchedulePage() {
  const instructors = await getUsers(["INSTRUCTOR"]);
  const classSchedules = await getClassSchedules();

  return (
    <main className="min-h-[calc(100vh-5rem)] p-8">
      <div className="container mx-auto flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-3xl font-title font-bold">Class Schedule</p>
            <p className="text-neutral-600">
              Manage your weekly schedule and organise recurring classes for
              your gym.
            </p>
          </div>

          <CreateClassSchedule instructors={instructors} />
        </div>

        <div>
          <ClassSchedulesTable data={classSchedules} />
        </div>
      </div>
    </main>
  );
}
