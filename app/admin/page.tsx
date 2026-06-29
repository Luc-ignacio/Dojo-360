export default async function AdminDashboardPage() {
  return (
    <main className="min-h-[calc(100vh-5rem)] p-8">
      <div className="container mx-auto flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-3xl font-title font-bold">Oss, welcome back!</p>
            <p className="text-neutral-600">The dojo is under your command.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
