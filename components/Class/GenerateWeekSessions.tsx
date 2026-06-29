"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { generateNextWeekSessions } from "@/app/actions/classSession";

export default function GenerateWeekSessions() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const { created, skipped, weekLabel } = await generateNextWeekSessions();

      if (created === 0) {
        toast.info(
          `Sessions for ${weekLabel} already exist — nothing to generate.`,
        );
      } else {
        toast.success(
          `Generated ${created} session${created !== 1 ? "s" : ""} for ${weekLabel}` +
            (skipped > 0 ? ` (${skipped} already existed)` : ""),
        );
      }

      router.refresh();
    } catch (e: any) {
      toast.error(e.message || "Failed to generate sessions");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleGenerate} disabled={isLoading} variant="outline">
      <CalendarPlus className="text-green-600" />
      {isLoading ? "Generating..." : "Generate Next Week's Sessions"}
    </Button>
  );
}
