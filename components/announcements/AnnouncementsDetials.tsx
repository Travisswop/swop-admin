import PrimaryButton from "@/components/button/PrimaryButton";
import astro from "@/public/images/Astro.png";
import { Announcements } from "@/types/Announcements";
import Image from "next/image";
import Link from "next/link";

const AnnouncementsDetials = ({
  announcementsDetials,
}: {
  announcementsDetials: Announcements[];
}) => {
  return (
    <div className="text-black bg-white p-6">
      <div className="flex justify-end">
        <Link
          href={`/create-announcement`}
          className=" px-6 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-200 flex items-center gap-1 w-max mb-6 "
        >
          Add Announcement
        </Link>
      </div>
      {announcementsDetials?.map((el, index) => (
        <div
          className="flex justify-between items-center py-3 border px-5"
          key={index}
        >
          <div className="flex items-start mt-3 gap-3">
            <Image
              src={el?.image || astro}
              alt="astro logo"
              className="w-[150px] h-auto"
              width={300}
              height={300}
            />
            <div className="flex flex-col gap-1">
              <p className="font-bold">{el?.header}</p>
              <p className="w-1/2 text-gray-600 text-sm line-clamp-4">
                {el?.subtext}
              </p>
            </div>
          </div>
          <PrimaryButton className="w-[11rem] flex items-center justify-center">
            Send everyone
          </PrimaryButton>
        </div>
      ))}
    </div>
  );
};

export default AnnouncementsDetials;
