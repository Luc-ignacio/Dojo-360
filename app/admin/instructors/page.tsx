import CreateUser from "@/components/User/Create";
// import { UsersIcon, TrendingUpIcon, DollarSignIcon } from "lucide-react";
import { getUsers } from "@/app/actions/user";
import { MembersTable } from "@/components/Tables/MembersTable";

export default async function MembersPage() {
  const instructors = await getUsers(["INSTRUCTOR"]);

  return (
    <main className="min-h-[calc(100vh-5rem)] p-8">
      <div className="container mx-auto flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-3xl font-title font-bold">Instructors</p>
            <p className="text-neutral-600">
              Manage your instructors, view profiles and assign to classes.
            </p>
          </div>

          <CreateUser role={"INSTRUCTOR"} />
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black rounded-xl p-4 flex w-full justify-between items-start">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase text-neutral-300">
                Members Enrolled
              </p>
              <p className="text-xl text-white">{instructors.length}</p>
              <p className="text-sm text-neutral-400">
                {newMembersCount} New Members This Month
              </p>
            </div>
            <span className="p-2 bg-neutral-800 rounded-lg">
              <UsersIcon className="text-neutral-400" />
            </span>
          </div>
          <div className="bg-black rounded-xl p-4 flex w-full justify-between items-start">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase text-neutral-300">
                Attendance Today
              </p>
              <p className="text-xl text-white">0</p>
              <p className="text-sm text-neutral-400">0 Adults | 0 Kids</p>
            </div>
            <span className="p-2 bg-neutral-800 rounded-lg">
              <TrendingUpIcon className="text-neutral-400" />
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
        </div> */}

        <div>
          <MembersTable data={instructors} />
        </div>
      </div>
    </main>
  );
}
