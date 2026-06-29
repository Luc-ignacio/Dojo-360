import GenerateWeekSessions from "@/components/Class/GenerateWeekSessions";
import { ClassSessionsTable } from "@/components/Tables/ClassSessionsTable";
import { getWeekClassSessions } from "@/app/actions/classSession";

export default async function ClassSessionsPage() {
  const { sessions: currentWeekSessions, weekLabel: currentWeekLabel } =
    await getWeekClassSessions(0);
  const { sessions: nextWeekSessions, weekLabel: nextWeekLabel } =
    await getWeekClassSessions(1);

  return (
    <main className="min-h-[calc(100vh-5rem)] p-8">
      <div className="container mx-auto flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-3xl font-title font-bold">Class Sessions</p>
            <p className="text-neutral-600">
              Track class sessions, attendance, cancellations, and session
              activity each week.
            </p>
          </div>

          <GenerateWeekSessions />
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <p className="font-semibold">
              Current Week Sessions: {currentWeekLabel}
            </p>
            <ClassSessionsTable data={currentWeekSessions} />
          </div>

          <div className="space-y-4">
            <p className="font-semibold">Next Week Sessions: {nextWeekLabel}</p>
            <ClassSessionsTable data={nextWeekSessions} />
          </div>
        </div>
      </div>
    </main>
  );
}
