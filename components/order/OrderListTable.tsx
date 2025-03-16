"use client";
import { FaSearch } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import DateFilterDropdown from "./DateFilterDropdown";
import NameFilterDropdown from "./NameFilterDropdown";

const OrderListTable = () => {
  // const [ordersList, setOrderList] = useState([]);

  // const token = (await cookies()).get("authToken")?.value;
  // const page = 1;
  // const limit = 10;
  // const search = "";
  // const startDate = "";
  // const endDate = "";
  // const sort = "createdAt:desc";

  // const ordersList = await getOrderLists(
  //   token || "",
  //   page,
  //   limit,
  //   search,
  //   startDate,
  //   endDate,
  //   sort
  // );

  return (
    <div className="w-full overflow-x-auto bg-white rounded-2xl p-9">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-6">
          <div className="w-96 relative">
            <input
              type="text"
              className="px-3 py-2 bg-[#F1F8FF] rounded-lg text-gray-700 pl-10 focus:outline-none w-full"
              placeholder="Search here..."
            />
            <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center space-x-5">
          <p className="text-gray-800 font-medium capitalize">Filter</p>
          <DateFilterDropdown />
          <NameFilterDropdown />
          <button className="flex items-center gap-2 bg-black px-3 py-2 transition-all border-2 border-gray-200 rounded-lg w-36 justify-center">
            <p className="text-white font-medium capitalize">Export</p>
            <LuDownload className="size-5 text-white" />
          </button>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-gray-500 border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm font-medium border-b">
            <tr className="">
              {["ID", "Name", "Email", "Amount", "Transaction Hash"].map(
                (header, idx) => (
                  <th
                    key={idx}
                    className={`px-6 py-3  text-base  font-normal ${
                      header === "User" ? "text-start pl-28" : "text-center"
                    } `}
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          {/* <tbody>
            {ordersList?.map((el, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50 border-b text-gray-800 text-sm"
              >
                <td className="px-6 py-4 text-center">
                  <Link href={`/order/${el?.id}`}>{el?.id}</Link>
                </td>
                <td className="px-6 py-4 text-center">{el?.customer?.name}</td>
                <td className="px-6 py-4 text-center">{el?.customer?.email}</td>
                <td className="px-6 py-4 text-center">
                  {el?.financial?.totalCost}
                </td>
                <td className="px-6 py-4 break-all text-center">
                  {el?.txResult?.hash}
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
    </div>
  );
};

export default OrderListTable;
