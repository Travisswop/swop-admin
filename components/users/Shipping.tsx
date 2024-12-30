"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";

import { Row } from "@/lib/placeholderData";

const Shipping = ({
  user,
  selectedSwopId,
}: {
  user: Row;
  selectedSwopId: string;
}) => {
  const selectedSite = user.site.find((site) => site.id === selectedSwopId);

  return (
    <div className="w-full h-full grid grid-cols-2 gap-5">
      <h2 className="col-span-2 text-black text-2xl float-left w-full">
        Shipping
      </h2>
      <section>
        <Card className="bg-[#f7f7f7] h-fit p-5">
          <CardContent className="pr-72 py-4  w-full grid grid-cols-2 gap-2">
            <h4>Address 1:</h4>
            <h4 className="text-black">{selectedSite?.address1}</h4>
            <h4>Address 2:</h4>
            <h4 className="text-black">{selectedSite?.address2}</h4>
            <h4>City:</h4>
            <h4 className="text-black">{selectedSite?.city}</h4>
          </CardContent>
        </Card>
      </section>
      <section>
        <Card className="bg-[#f7f7f7] h-fit p-5">
          <CardContent className="pr-44 py-4 w-full grid grid-cols-2 gap-2 basis-1">
            <h4>Zipcode:</h4>

            <h4 className="text-black">{selectedSite?.zip}</h4>

            <h4>State/Providence:</h4>
            <h4 className="text-black">{selectedSite?.state}</h4>
            <h4>Country:</h4>
            <h4 className="text-black">{selectedSite?.country}</h4>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Shipping;
