"use client";
import TimeTable from "./components/TimeTable";
import TinChi from "@/components/common/TinChi";
const TimetableGrid = () => {
   return (
      <div className="w-full overflow-x-auto rounded-md border px-8 pt-10">
         <div className="mb-5 font-bold flex items-start justify-between">
            <h2 className="font-bold text-3xl">Thời khóa biểu</h2>
            <TinChi /> 
         </div>

         <TimeTable />
      </div>
   );
};

export default TimetableGrid;
