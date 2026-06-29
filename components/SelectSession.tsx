import { TodaySessionsResult } from "@/app/actions/classSession";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectSession({
  value,
  onChange,
  options,
  placeholder,
}: {
  value?: string;
  onChange: (v: string) => void;
  options: TodaySessionsResult;
  placeholder: string;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((session) => (
          <SelectItem key={session.id} value={session.id}>
            <div className="flex flex-col">
              {session.name} - {session.Schedule.startTime} - Prof.{" "}
              {session.Instructor.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
