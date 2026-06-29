import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function NotInvitedPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Access Denied</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Your email is not registered. Please contact your instructor.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
