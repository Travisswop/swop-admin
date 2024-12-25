import React from "react";

function SalesLeaderboard() {
  const leaderboardData = [
    {
      rank: "01",
      name: "Travis",
      amount: 45,
      frontColor: "#0095FF",
      backgroundColor: "#CDE7FF",
    },
    {
      rank: "02",
      name: "Neel",
      amount: 29,
      frontColor: "#00E096",
      backgroundColor: "#8CFAC7",
    },
    {
      rank: " 03",
      name: "Sadit",
      amount: 18,
      frontColor: "#884DFF",
      backgroundColor: "#C5A8FF",
    },
    {
      rank: "04",
      name: "Abdul",
      amount: 25,
      frontColor: "#FF8F0D",
      backgroundColor: "#FFD5A4",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Sales Leaderboard</h2>
      <table className="w-full">
        <thead>
          <tr className="text-[#96A5B8] border-b">
            <th className="text-left font-normal py-2">#</th>
            <th className="text-left font-normal">Name</th>
            <th className="text-left font-normal">Amount</th>
            <th className="text-right font-normal">Owed</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((row, index) => (
            <tr key={index} className="border-b">
              <td className=" text-[#444A6D] py-3">{row.rank}</td>
              <td className="text-[#444A6D]">{row.name}</td>
              <td>
                <div
                  style={{
                    backgroundColor: row.backgroundColor,
                  }}
                  className="w-full rounded-full h-2"
                >
                  <div
                    className={` h-2 rounded-full`}
                    style={{
                      width: `${row.amount}%`,
                      backgroundColor: row.frontColor,
                    }}
                  ></div>
                </div>
              </td>
              <td className="text-right">
                <span
                  style={{
                    border: `2px solid ${row.frontColor}`,
                    color: row.frontColor,
                  }}
                  className="rounded-full px-2 py-1"
                >
                  {row.amount}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesLeaderboard;
