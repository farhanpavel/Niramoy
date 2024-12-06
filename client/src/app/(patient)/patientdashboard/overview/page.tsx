import { Barchart } from "@/components/Barchart/page";
import { Piecharts } from "@/components/Piechart/page";
import { Linecharts } from "@/components/linecharts/page";
import { Bigchart } from "@/components/mainchart/page";
import React from "react";

export default function page() {
  return (
    <div className="p-4">
      <div className="flex justify-between gap-10">
        <div>
          <Piecharts />
        </div>
        <div>
          <Barchart />
        </div>
        <div>
          <Linecharts />
        </div>
      </div>
      <div className="mt-2">
        <Bigchart />
      </div>
    </div>
  );
}
