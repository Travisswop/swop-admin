import CustomTable from "@/components/CustomTable";

//imported data for table
// import data from "@/lib/placeholderData";
const page = () => {
  return (
    <section className="w-full h-full flex flex-col justify-start items-center text-[#737791]">
      <CustomTable
      // sideText=""
      // dynamicData={data}
      // showSearch={true}
      // swopId={true}
      // clickPath="/swop-id"
      // clickAble={true}
      />
    </section>
  );
};

export default page;
