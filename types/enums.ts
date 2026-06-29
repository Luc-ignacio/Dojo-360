// Role
export type Role = "ADMIN" | "INSTRUCTOR" | "MEMBER";

export const RoleOptions: {
  label: string;
  value: Role;
}[] = [
  {
    label: "Admin",
    value: "ADMIN",
  },
  {
    label: "Instructor",
    value: "INSTRUCTOR",
  },
  {
    label: "Member",
    value: "MEMBER",
  },
];

export const RoleLabels: Record<Role, string> = {
  ADMIN: "Admin",
  INSTRUCTOR: "Instructor",
  MEMBER: "Member",
};

// Belt
export type Belt = "WHITE" | "BLUE" | "PURPLE" | "BROWN" | "BLACK";

export const BeltOptions: {
  label: string;
  value: Belt;
}[] = [
  {
    label: "White",
    value: "WHITE",
  },
  {
    label: "Blue",
    value: "BLUE",
  },
  {
    label: "Purple",
    value: "PURPLE",
  },
  {
    label: "Brown",
    value: "BROWN",
  },
  {
    label: "Black",
    value: "BLACK",
  },
];

export const BeltLabels: Record<Belt, string> = {
  WHITE: "White",
  BLUE: "Blue",
  PURPLE: "Purple",
  BROWN: "Brown",
  BLACK: "Black",
};

export const BeltColorMap: Record<string, string> = {
  WHITE: "text-white",
  BLUE: "text-blue-600",
  PURPLE: "text-purple-600",
  BROWN: "text-yellow-800",
  BLACK: "text-black",
};

// Stripes
export const StripeOptions: {
  label: string;
  value: number;
}[] = [
  {
    label: "None",
    value: 0,
  },
  {
    label: "1",
    value: 1,
  },
  {
    label: "2",
    value: 2,
  },
  {
    label: "3",
    value: 3,
  },
  {
    label: "4",
    value: 4,
  },
];

export const StripeLabels: Record<number, string> = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
};

// Day Of Week
export type DayOfWeek =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY";

export const DayOfWeekIndex: Record<DayOfWeek, number> = {
  MONDAY: 0,
  TUESDAY: 1,
  WEDNESDAY: 2,
  THURSDAY: 3,
  FRIDAY: 4,
  SATURDAY: 5,
  SUNDAY: 6,
};

export const DaysOfWeekOptions: {
  label: string;
  value: DayOfWeek;
}[] = [
  {
    label: "Sunday",
    value: "SUNDAY",
  },
  {
    label: "Monday",
    value: "MONDAY",
  },
  {
    label: "Tuesday",
    value: "TUESDAY",
  },
  {
    label: "Wednesday",
    value: "WEDNESDAY",
  },
  {
    label: "Thursday",
    value: "THURSDAY",
  },
  {
    label: "Friday",
    value: "FRIDAY",
  },
  {
    label: "Saturday",
    value: "SATURDAY",
  },
];

export const DayOfWeekLabels: Record<DayOfWeek, string> = {
  SUNDAY: "Sunday",
  MONDAY: "Monday",
  TUESDAY: "Tuesday",
  WEDNESDAY: "Wednesday",
  THURSDAY: "Thursday",
  FRIDAY: "Friday",
  SATURDAY: "Saturday",
};

// Class Type
export type ClassType =
  | "FUNDAMENTALS"
  | "INTERMEDIATE"
  | "ADVANCED"
  | "COMPETITION"
  | "NOGI";

export const ClassTypeOptions: {
  label: string;
  value: ClassType;
}[] = [
  {
    label: "Fundamentals",
    value: "FUNDAMENTALS",
  },
  {
    label: "Intermediate",
    value: "INTERMEDIATE",
  },
  {
    label: "Advanced",
    value: "ADVANCED",
  },
  {
    label: "Competition",
    value: "COMPETITION",
  },
  {
    label: "No-Gi",
    value: "NOGI",
  },
];

export const ClassTypeLabels: Record<ClassType, string> = {
  FUNDAMENTALS: "Fundamentals",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  COMPETITION: "Competition",
  NOGI: "No-Gi",
};
