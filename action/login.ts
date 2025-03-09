"use server";

import { cookies } from "next/headers";

// export const maxDuration = 60;

// import { revalidatePath } from "next/cache";

interface ILoginPayload {
  email: string;
  password: string;
}

export async function login(payload: ILoginPayload) {
  const cookieStore = await cookies();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    if (data.success) {
      cookieStore.set("authToken", data.token, {
        secure: true,
        httpOnly: true,
      });
    }
    return data;
  } catch (error) {
    console.error("Error from action:", error);
  }
}

// export async function updateBlog(info: any, token: string) {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/v4/microsite/blog`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(info),
//       }
//     );
//     revalidatePath(`/smartsites/icons/${info.micrositeId}`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error from action:", error);
//   }
// }

// export async function deleteBlog(info: any, token: string) {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/v4/microsite/blog`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(info),
//       }
//     );
//     revalidatePath(`/smartsites/icons/${info.micrositeId}`);
//     const data = await response.json();
//     // console.log("data from action", data);
//     return data;
//   } catch (error) {
//     console.error("Error from action:", error);
//   }
// }
