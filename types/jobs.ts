export type Jobs = {
  jobTitle: string;
  officeLocation: string;
  skills: string[];
  minSalary: number;
  maxSalary: number;
  salaryType: "" | "hourly" | "monthly" | "annually" | undefined;
  currency: string;
  deadline: Date;
  description: string;
  status: "" | "draft" | "published" | "expired" | undefined;
};
