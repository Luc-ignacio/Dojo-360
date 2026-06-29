import { getCurrentUser } from "@/lib/auth/get-current-user";
import { BeltOptions } from "@/types/enums";
import { DollarSignIcon, Medal, Flame } from "lucide-react";
import {
  getTodaySessions,
  getWeekClassSessions,
} from "../actions/classSession";
import { ClassSessionsTable } from "@/components/Tables/ClassSessionsTable";
import CheckIn from "@/components/Class/CheckIn";
import { getMemberAttendanceThisMonth } from "../actions/attendance";

export default async function MemberDashboardPage() {
  const user = await getCurrentUser();

  if (!user) return null;

  const { sessions, weekLabel } = await getWeekClassSessions(0);

  const todaySessions = await getTodaySessions();

  const memberAttendance = await getMemberAttendanceThisMonth(user.id);

  return (
    <main className="min-h-[calc(100vh-5rem)] p-8">
      <div className="container mx-auto flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-3xl font-title font-bold">Oss, {user?.name}!</p>
            <p className="text-neutral-600">Time to get on the mats.</p>
          </div>

          <CheckIn sessions={todaySessions} user={user} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black rounded-xl p-4 flex w-full justify-between items-start">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase text-neutral-300">
                Current Belt
              </p>
              <p className="text-xl text-white">
                {BeltOptions.find((belt) => user?.belt === belt.value)?.label}
              </p>
              <p className="text-sm text-neutral-400">
                {user?.stripes} Stripe{user?.stripes === 1 ? "" : "s"}
              </p>
            </div>
            <span className="p-2 bg-neutral-800 rounded-lg">
              <Medal className="text-neutral-400" />
            </span>
          </div>
          <div className="bg-black rounded-xl p-4 flex w-full justify-between items-start">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase text-neutral-300">
                Attendance
              </p>
              <p className="text-xl text-white">{memberAttendance}</p>
              <p className="text-sm text-neutral-400">This Month</p>
            </div>
            <span className="p-2 bg-neutral-800 rounded-lg">
              <Flame className="text-neutral-400" />
            </span>
          </div>
          <div className="bg-black rounded-xl p-4 flex w-full justify-between items-start">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase text-neutral-300">
                Estimated Revenue
              </p>
              <p className="text-xl text-white">0</p>
              <p className="text-sm text-neutral-400">
                Next Billing Cycle: 24 April
              </p>
            </div>
            <span className="p-2 bg-neutral-800 rounded-lg">
              <DollarSignIcon className="text-neutral-400" />
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-semibold">Current Week Sessions: {weekLabel}</p>
          <ClassSessionsTable data={sessions} />
        </div>
      </div>
    </main>
  );
}
