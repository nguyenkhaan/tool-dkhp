"use client";
import Card from "./Card";
import { useTkb } from "@/zus/tkb";
import { useShallow } from "zustand/react/shallow";
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
   
   const { courses, chonTay , coursesChonTay , hydrate } = useTkb(
      //Dong bo du lieu
      useShallow((state) => ({
         courses: state.courses,
         hydrate: state.hydrate,
         chonTay: state.chonTay, 
         coursesChonTay: state.coursesChonTay 
      })),
   );
   return (
      <div className="flex flex-col items-start justify-start">
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
                     key={index * 2 + 1}
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
                        key={index * 3 + 1}
                        className="h-[64px] gap-1 flex border-2 items-center justify-center flex-col text-base bg-neutral-300/80 font-medium"
                     >
                        <p>Tiết {period.tiet}</p>
                        <p>{period.time}</p>
                     </div>
                     {Array(6)
                        .fill(0)
                        .map((item, index) => (
                           <div
                              key={index * 4 + 1}
                              className="bg-neutral-300/80 border-2 h-[64px]"
                           ></div>
                        ))}
                  </>
               );
            })}
            {/* Cac mon hoc duoc lay o day  */}
            {hydrate ? (
               (chonTay? Array.from(coursesChonTay.ds.values()) : Array.from(courses.ds.values()))
               .filter((course) => course.Thu != '*').map((course, index) => {
                  return <Card course={course} key={course.MaLop} />;
               })
            ) : (
               <></>
            )}
         </div>
            {
               (chonTay? Array.from(coursesChonTay.ds.values()) : Array.from(courses.ds.values()))
               .map((course, index) => {
                  return <div className="min-w-[1360px] h-40 border border-gray-400 my-1 rounded-md bg-white flex flex-col items-center justify-center">
                     <p className="font-semibold text-center">{course.MaLop} {course.NgonNgu}</p>
                     <p className="text-center">{course.TenMH}</p>
                     <p className="font-semibold text-center">{course.TenGV}</p>
                     <p className="text-center">{course.PhongHoc}</p>
                     <p className="text-center">BD: {course.NBD}</p>
                     <p className="text-center">KT: {course.NKT}</p>
                  </div>
               })
            }
      </div>
   );
}

export default TimeTable;
