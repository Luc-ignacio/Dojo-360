import { ClassSchedule, User } from "@/app/generated/prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClassTypeLabels } from "@/types/enums";

export default function SelectClassSchedule({
  value,
  onChange,
  options,
  placeholder,
}: {
  value?: string;
  onChange: (v: string) => void;
  options: Array<
    ClassSchedule & { Instructor: { name: string; avatarUrl?: string } }
  >;
  placeholder: string;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((classSchedule) => (
          <SelectItem key={classSchedule.id} value={classSchedule.id}>
            <div className="flex items-center gap-2">
              {classSchedule.name} - {ClassTypeLabels[classSchedule.classType]}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
