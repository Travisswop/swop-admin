import QrCodeLists from "@/components/qrCodeManagement/QrCodeLists";
import { cookies } from "next/headers";

const QrCodePage = async () => {
  const token = (await cookies()).get("authToken")?.value;

  return (
    <div className="main-container pb-6 relative text-black bg-white py-6 px-5">
      <QrCodeLists token={token ?? ""} />
    </div>
  );
};

export default QrCodePage;
