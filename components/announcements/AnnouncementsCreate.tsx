"use client";

import { createAnnouncements } from "@/action/announcements";
import PrimaryButton from "@/components/button/PrimaryButton";
import { sendCloudinaryImage } from "@/lib/sendCloudinaryImage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DragEvent, useState } from "react";
import { TbCameraPlus } from "react-icons/tb";
import { toast } from "react-toastify";

const AnnouncementsCreate = ({ token }: { token: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const [image, setImage] = useState("");
  const [selectedImageName, setSelectedImageName] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const [header, setHeader] = useState("");
  const [subText, setSubtext] = useState("");
  const [link, setLink] = useState("");

  const status = true;

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedImageName(file.name);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result as string;

      try {
        setImageUploading(true);
        const image = await sendCloudinaryImage(base64Image);
        setImage(image);

        setImageUploading(false);
      } catch (error) {
        console.error("Error uploading image:", error);
        setImageUploading(false);
        alert("Failed to upload image. Please try again.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    setSelectedImageName(file.name);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result as string;

      try {
        setImageUploading(true);
        const image = await sendCloudinaryImage(base64Image);
        setImage(image);

        setImageUploading(false);
      } catch (error) {
        console.error("Error uploading image:", error);
        setImageUploading(false);
        alert("Failed to upload image. Please try again.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Ensure that address, coordinates, and childId are correctly typed
      const response = await createAnnouncements(
        header,
        link,
        subText,
        image,
        status,
        token
      );

      if (response.success) {
        toast.success("Announcement added successfully");
        console.log("Announcement added successfully");
        router.back();
      } else {
        toast.error("Failed to add announcement");
      }
    } catch (err) {
      console.error("Error adding announcement:", err);
      toast.error("Error adding announcement");
      setError("Failed to add connection. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  console.log("dfds", error);

  return (
    <div className="text-black bg-white px-6 py-10">
      <div className="flex justify-between items-end py-6 border px-6">
        <div className="flex gap-3">
          <div
            className="bg-gray-100 p-8 rounded-lg border-2 border-dashed text-center border-gray-300 h-[220px] -mt-2"
            style={{ minWidth: "300px", width: "70%" }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleImageDrop}
          >
            {image ? (
              <div className="flex flex-col items-center">
                <Image
                  src={image}
                  width={100}
                  height={100}
                  alt="Preview"
                  className="rounded-lg object-cover w-[100px] h-[100px]"
                />
                <p className="text-sm mt-2 text-gray-700">
                  {selectedImageName}
                </p>
                <label
                  htmlFor="image"
                  className="inline-block bg-black text-white px-4 py-2 rounded-lg mt-2 cursor-pointer"
                >
                  Change Picture
                </label>
              </div>
            ) : (
              <div>
                <div className="flex flex-col items-center justify-center cursor-pointer ">
                  <div className="text-6xl text-gray-400">
                    <TbCameraPlus
                      size={36}
                      className="mx-auto mb-2 text-[#5C5C5C]"
                    />
                  </div>
                  <p className="text-gray-500 my-3 text-sm">
                    Browse or drag and drop an image here . <br />( JPEG, JPG,
                    PNG )
                  </p>
                  <label
                    htmlFor="image"
                    className="inline-block bg-black text-white px-9 py-2 rounded-lg mt-2 cursor-pointer "
                  >
                    Browse
                  </label>
                </div>
              </div>
            )}
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {imageUploading && (
              <p className="text-sm text-gray-400">Uploading image...</p>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-1">
              <div>
                <p className="font-medium">Header:</p>
                <input
                  type="text"
                  placeholder="Input text here"
                  className="focus:outline-none py-2 border px-3 w-64 2xl:w-72"
                  value={header}
                  onChange={(e) => setHeader(e.target.value)}
                />
              </div>
              <div>
                <p className="font-medium">Subtext:</p>
                <input
                  type="text"
                  placeholder="Input text here"
                  className="focus:outline-none py-2 border px-3 w-64 2xl:w-72"
                  value={subText}
                  onChange={(e) => setSubtext(e.target.value)}
                />
              </div>
            </div>
            <div>
              <p className="font-medium">Link:</p>
              <input
                type="text"
                placeholder="Input text here"
                className="focus:outline-none py-2 border px-3 w-64 2xl:w-72"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div>
        </div>
        <PrimaryButton onClick={handleSubmit}>
          {" "}
          {loading ? "Loadding" : "Create"}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default AnnouncementsCreate;
