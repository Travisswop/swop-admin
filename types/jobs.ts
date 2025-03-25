export type Jobs = {
  _id?: string;
  jobTitle: string;
  officeLocation: string;
  skills: string[];
  jobType: string;
  minSalary: number;
  maxSalary: number;
  salaryType: "" | "hourly" | "monthly" | "annually" | undefined;
  currency: string;
  deadline: Date;
  description: string;
  status: "" | "draft" | "published" | "expired" | undefined;
  createdAt?: string;
  updatedAt?: string;
};
