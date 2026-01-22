"use client";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/registry/ui/table";
import Card from "./Card";
const DAYS = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

const PERIODS = [
   { tiet: 1, time: "7:30 - 8:15" },
   { tiet: 2, time: "8:15 - 9:00" },
   { tiet: 3, time: "9:00 - 9:45" },
   { tiet: 4, time: "10:00 - 10:45" },
   { tiet: 5, time: "10:45 - 11:30" },
   { tiet: 6, time: "13:00 - 13:45" },
   { tiet: 7, time: "13:45 - 14:30" },
   { tiet: 8, time: "14:30 - 15:15" },
   { tiet: 9, time: "15:30 - 16:15" },
   { tiet: 10, time: "16:15 - 17:00" },
];
function TimeTable() {
   return (
      <div
         className="min-w-[1200px] border-collapse grid grid-cols-7 gap-x-0 gap-y-0 relative"
         style={{
            gridTemplateColumns: "160px repeat(6, 200px)",
         }}
      >
         <div className="bg-muted text-center font-bold border flex items-center h-10 justify-center text-base">
            Thứ / tiết
         </div>
         {DAYS.map((item, index) => {
            return (
               <div
                  key={index + 1}
                  className="bg-muted h-10 flex border items-center justify-center font-bold"
               >
                  {item}
               </div>
            );
         })}
         {/* Tao cac cell ben duoi  */}
         {PERIODS.map((period, index) => {
            return (
               <>
                  <div
                     key={index + 100}
                     className="h-[64px] gap-1 flex border-2 items-center justify-center flex-col text-base bg-neutral-300/80 font-medium"
                  >
                     <p>Tiết {period.tiet}</p>
                     <p>{period.time}</p>
                  </div>
                  {Array(6)
                     .fill(0)
                     .map((item, index) => (
                        <div
                           key={index + 1000}
                           className="bg-neutral-300/80 border-2 h-[64px]"
                        ></div>
                     ))}
               </>
            );
         })}
         <div
            className="absolute bg-blue-200 z-10 rounded-md"
            style={{
               left: "560px", //(Thu - 2) * 200px + 160 vd: Thu 2 -> (2 - 1) * 160px 
               top: "168px", // 40 + (Tiet bat dau - 1) * 64 
               width: "200px",
               height: "256px", // So tiet * 64px 
               //Vi du: Thu 4, tiet 3456
            }}
         ></div>
      </div>
   );
}

export default TimeTable;
