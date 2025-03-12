import { FaSearch } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import DateFilterDropdown from "./DateFilterDropdown";
import NameFilterDropdown from "./NameFilterDropdown";

const testData = [
  {
    id: "#10001",
    name: "Hamid Hasan",
    email: "hamidul3@gmail.com",
    amount: "$58.89",
    wallet_address: "0xB4fH3466gfd6j7nf7iR8mn800mda21fVnm,0df67Xd",
  },
  {
    id: "#10001",
    name: "Nahid Khan",
    email: "hamidul3@gmail.com",
    amount: "$123.89",
    wallet_address: "0xB4fH3466gfd6j7nf7iR8mn800mda21fVnm,0df67Xd",
  },
  {
    id: "#10001",
    name: "Urmila Hasan",
    email: "hamidul3@gmail.com",
    amount: "$558.89",
    wallet_address: "0xB4fH3466gfd6j7nf7iR8mn800mda21fVnm,0df67Xd",
  },
  {
    id: "#10001",
    name: "Husain Rahman",
    email: "hamidul3@gmail.com",
    amount: "$235.678",
    wallet_address: "0xB4fH3466gfd6j7nf7iR8mn800mda21fVnm,0df67Xd",
  },
  {
    id: "#10001",
    name: "Nabila Khan",
    email: "hamidul3@gmail.com",
    amount: "$78.008",
    wallet_address: "0xB4fH3466gfd6j7nf7iR8mn800mda21fVnm,0df67Xd",
  },
  {
    id: "#10001",
    name: "Alex Biny",
    email: "hamidul3@gmail.com",
    amount: "$436.890",
    wallet_address: "0xB4fH3466gfd6j7nf7iR8mn800mda21fVnm,0df67Xd",
  },
  {
    id: "#10001",
    name: "Joly Inn",
    email: "hamidul3@gmail.com",
    amount: "$58.89",
    wallet_address: "0xB4fH3466gfd6j7nf7iR8mn800mda21fVnm,0df67Xd",
  },
  {
    id: "#10001",
    name: "Dgaiu Fhgh",
    email: "hamidul3@gmail.com",
    amount: "$235.678",
    wallet_address: "0xB4fH3466gfd6j7nf7iR8mn800mda21fVnm,0df67Xd",
  },
  {
    id: "#10001",
    name: "Fga KFG",
    email: "hamidul3@gmail.com",
    amount: "$123.89",
    wallet_address: "0xB4fH3466gfd6j7nf7iR8mn800mda21fVnm,0df67Xd",
  },
  {
    id: "#10001",
    name: "Faddy Fg",
    email: "hamidul3@gmail.com",
    amount: "$235.678",
    wallet_address: "0xB4fH3466gfd6j7nf7iR8mn800mda21fVnm,0df67Xd",
  },
  {
    id: "#10001",
    name: "zasf uihj",
    email: "hamidul3@gmail.com",
    amount: "$558.89",
    wallet_address: "0xB4fH3466gfd6j7nf7iR8mn800mda21fVnm,0df67Xd",
  },
  {
    id: "#10001",
    name: "xGhani",
    email: "hamidul3@gmail.com",
    amount: "$78.008",
    wallet_address: "0xB4fH3466gfd6j7nf7iR8mn800mda21fVnm,0df67Xd",
  },
  {
    id: "#10001",
    name: "sdfed",
    email: "hamidul3@gmail.com",
    amount: "$558.89",
    wallet_address: "0xB4fH3466gfd6j7nf7iR8mn800mda21fVnm,0df67Xd",
  },
  {
    id: "#10001",
    name: "scdita",
    email: "hamidul3@gmail.com",
    amount: "$235.678",
    wallet_address: "0xB4fH3466gfd6j7nf7iR8mn800mda21fVnm,0df67Xd",
  },
  {
    id: "#10001",
    name: "Sawta Fren",
    email: "hamidul3@gmail.com",
    amount: "$123.89",
    wallet_address: "0xB4fH3466gfd6j7nf7iR8mn800mda21fVnm,0df67Xd",
  },
];

const OrderListTable = () => {
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
          <tbody>
            {testData.map((el, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50 border-b text-gray-800 text-sm"
              >
                <td className="px-6 py-4 text-center">{el?.id}</td>
                <td className="px-6 py-4 text-center">{el?.name}</td>
                <td className="px-6 py-4 text-center">{el?.email}</td>
                <td className="px-6 py-4 text-center">{el?.amount}</td>
                <td className="px-6 py-4 break-all text-center">
                  {el?.wallet_address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderListTable;
