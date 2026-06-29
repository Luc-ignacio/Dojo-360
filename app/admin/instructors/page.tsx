import CreateUser from "@/components/User/Create";
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

        <div>
          <MembersTable instructors={instructors} />
        </div>
      </div>
    </main>
  );
}
