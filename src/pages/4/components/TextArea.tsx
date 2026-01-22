"use client";
import { Textarea } from "@/registry/ui/textarea";
import { useState } from "react";
import { useEffect } from "react";
import { useTkb } from "@/zus/tkb";
import { chonTay } from "@/helpers/validateChoosing";
import { useShallow } from "zustand/react/shallow";
import { Checkbox } from "@/registry/ui/checkbox";
const TextArea = () => {
   

   const { courses, coursesChonTay , choose, unchoose, setChonTay, chonTay } = useTkb(
      useShallow((state) => ({
         courses: state.courses,
         choose: state.choose,
         unchoose: state.unchoose,
         setChonTay: state.setChonTay,
         chonTay: state.chonTay,
         coursesChonTay : state.coursesChonTay
      })),
    );
    const [dsMa, setDsMa] = useState(Array.from(coursesChonTay.ds.values())
                          .map((item) => item.MaLop)
                          .join(","));

   const tkb = useTkb((state) => state.tkbData);
   //Moi khi cap nhat danh sach ma thanh cong / them lop thanh cong thi moi tao script
   const handleDsMaChange = (e: any) => {
      //Khong on mot chut nao het
      if (chonTay) 
        {
            setDsMa(e.target.value)
        }
   };
   const handleCheckChange = (checked: boolean) => {
      if (checked) setChonTay(true);
      else setChonTay(false);
   };
   return (
      <div className="w-full flex gap-x-16 my-4 mt-3 items-center justify-between">
         <div className="w-full">
            <div className="w-full flex items-start justify-between">
               <h3 className="font-bold text-base">Danh sách mã môn</h3>
               <div>
                  <label htmlFor="chon-tay" className="mr-1">
                     Tự chuẩn bị môn học
                  </label>{" "}
                  <Checkbox id="chon-tay" onCheckedChange={handleCheckChange} />
               </div>
            </div>
            <Textarea
               disabled={!chonTay}
               className="text-lg"
               onChange={handleDsMaChange}
               value={
                  chonTay
                     ? dsMa
                     : Array.from(courses.ds.values())
                          .map((item) => item.MaLop)
                          .join(",")
               }
            />
         </div>

         <div className="w-full">
            <h3 className="font-bold text-base">
               Script đăng kí{" "}
               <span className="font-light italic">
                  (Paste vào console để đăng ký)
               </span>
            </h3>
            <Textarea />
         </div>
      </div>
   );
};
export default TextArea;
