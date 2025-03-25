"use server";

import { Jobs } from "@/types/jobs";
import { revalidateTag } from "next/cache";

interface ApiResponse {
  success: boolean;
  message: string;
  data: Jobs[];
}

export async function getJobs(token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/jobs`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ["createAnnouncements"],
        },
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.message ||
          `API Error: ${response.status} ${response.statusText}`
      );
    }

    const result: ApiResponse = await response.json();

    return {
      success: result.success,
      message: result.message,
      data: result.data as Jobs[],
    };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return {
      success: false,
      message: "Failed to fetch jobs.",
      data: [] as Jobs[],
    };
  }
}

export async function getJobsById(id: string, token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/jobs/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ["createAnnouncements"],
        },
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.message ||
          `API Error: ${response.status} ${response.statusText}`
      );
    }

    const result: ApiResponse = await response.json();

    return {
      success: result.success,
      message: result.message,
      data: result.data as Jobs[],
    };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return {
      success: false,
      message: "Failed to fetch jobs.",
      data: [] as Jobs[],
    };
  }
}

export async function createJob(jobsForm: Jobs, token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/job`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobsForm),
      }
    );

    revalidateTag("createJob");

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.message ||
          `API Error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return {
      success: true,
      message: data.message || "Job created successfully",
      data: data.data || null,
    };
  } catch (error) {
    console.error("Error creating job:", error);
    return {
      success: false,
      message: "Failed to create job",
      data: null,
    };
  }
}

export async function updateJob(jobsForm: Jobs, id: string, token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/job/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobsForm),
      }
    );

    revalidateTag("updateJob");

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.message ||
          `API Error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return {
      success: true,
      message: data.message || "Job update successfully",
      data: data.data || null,
    };
  } catch (error) {
    console.error("Error update job:", error);
    return {
      success: false,
      message: "Failed to update job",
      data: null,
    };
  }
}
