import Image from "next/image";
import Link from "next/link";

const demoTableData = [
  {
    name: "Hamid Hasan",
    id: "Hamid.Swopple.ID",
    wallet: "0xB4Fh3466...67Xd",
    code: "8hg4xcvv",
  },
  {
    name: "Szekeres Dalma",
    id: "Hamid.Swopple.ID",
    wallet: "0xB4Fh3466...67Xd",
    code: "8hg4xcvv",
  },
  {
    name: "Gáspár Gréta",
    id: "Hamid.Swopple.ID",
    wallet: "0xB4Fh3466...67Xd",
    code: "8hg4xcvv",
  },
  {
    name: "László Barbara",
    id: "Hamid.Swopple.ID",
    wallet: "0xB4Fh3466...67Xd",
    code: "8hg4xcvv",
  },
  {
    name: "Kiss Laura",
    id: "Hamid.Swopple.ID",
    wallet: "0xB4Fh3466...67Xd",
    code: "8hg4xcvv",
  },
  {
    name: "Szüts Gabriella",
    id: "Hamid.Swopple.ID",
    wallet: "0xB4Fh3466...67Xd",
    code: "8hg4xcvv",
  },
  {
    name: "Vincze Nikolett",
    id: "Hamid.Swopple.ID",
    wallet: "0xB4Fh3466...67Xd",
    code: "8hg4xcvv",
  },
  {
    name: "Pintér Beatrix",
    id: "Hamid.Swopple.ID",
    wallet: "0xB4Fh3466...67Xd",
    code: "8hg4xcvv",
  },
];

//imported data for table
const page = () => {
  console.log("check this data", dynamicData);

  return (
    <section className="w-full h-full flex flex-col justify-start items-center text-[#737791]">
      {/* <CustomTable
        sideText=""
        dynamicData={data}
        showSearch={true}
        swopId={true}
        clickPath="/swop-id"
        clickAble={true}
      /> */}

      <table className="w-full text-left rtl:text-right text-gray-500 ">
        <thead className="text-[16px] font-medium text-white text-center bg-[#383E54]">
          <tr>
            {[
              "User Name",
              "Number",
              "Email",
              "Address",
              "Reg. Date",
              "Action",
            ].map((header, idx) => (
              <th key={idx} className="px-6 py-3 text-center">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {demoTableData?.map((el) => (
            <tr
              key={client}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b text-[16px] font-medium text-gray-800 text-center "
            >
              <td className="px-6 py-4 ">
                <Link
                  className="flex items-center space-x-2"
                  href={`/client/${client}`}
                >
                  <Image
                    src="/assets/user-image/user-image.png"
                    alt="User Picture"
                    width={35}
                    height={35}
                  />
                  <span>Test nam,e</span>
                </Link>
              </td>
              <td>
                <Link href={`/client/${client._id}`}>dsfdsf</Link>
              </td>
              <td>
                <Link href={`/client/${client._id}`}>Test nam,e</Link>
              </td>
              <td>
                <Link href={`/client/${client._id}`}>Test nam,e</Link>
              </td>
              <td>Test nam,e</td>
              <td className="flex justify-center space-x-3 mt-5">
                <Link
                  href={`/client-edit/${client._id}`}
                  className="bg-yellow-100 p-1.5 rounded hover:bg-yellow-200"
                >
                  {/* <FiEdit className="text-yellow-600" /> */}test
                </Link>
                <button className="bg-red-100 p-1.5 rounded hover:bg-red-200">
                  {/* <RiDeleteBin6Fil className="text-red-500" /> */}test
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default page;
