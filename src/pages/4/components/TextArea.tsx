"use client";
import { Textarea } from "@/registry/ui/textarea";
import { useState } from "react";
import { useEffect } from "react";
import { useTkb } from "@/zus/tkb";
import { kiemTraChonTay } from "@/helpers/validateChoosing";
import { useShallow } from "zustand/react/shallow";
import { Checkbox } from "@/registry/ui/checkbox";
const TextArea = () => {
   const { courses, coursesChonTay, choose, unchoose, setChonTay, chonTay , hydrate } =
      useTkb(
         useShallow((state) => ({
            courses: state.courses,
            choose: state.choose,
            unchoose: state.unchoose,
            setChonTay: state.setChonTay,
            chonTay: state.chonTay,
            coursesChonTay: state.coursesChonTay,
            hydrate : state.hydrate
         })),
      );
   const [dsMa, setDsMa] = useState(
      coursesChonTay.ds instanceof Map
         ? Array.from(coursesChonTay.ds.values())
              .map((item) => item.MaLop)
              .join(",")
         : "", // nếu chưa hydrate hoặc là array, tránh lỗi
   );

   const tkb = useTkb((state) => state.tkbData);
   //Moi khi cap nhat danh sach ma thanh cong / them lop thanh cong thi moi tao script
   const handleDsMaChange = (e: any) => {
      //Khong on mot chut nao het
      if (chonTay) {
         setDsMa(e.target.value);
         //Sau khi set DsMa thi se dat tien hanh chon mon
         //Tien hanh chon mon
      }
   };
   useEffect(() => {
      if (!chonTay) return;

      const arr = dsMa
         .split(",")
         .map((x) => x.trim())
         .filter((x) => x.length > 0);
      const oldDs = new Map(coursesChonTay.ds);
      const newDs = new Map<string, any>();
      let newTc = 0;
      for (const maLop of arr) {
         const data = tkb.get(maLop);
         if (data) {
            //Kiem tra dieu kien de them ma lop
            if (kiemTraChonTay({ ds: newDs, tc: newTc }, data)) {
               newDs.set(maLop, data);
               newTc += data.SoTc;
            }
         }
      }

      useTkb.setState({
         coursesChonTay: {
            ds: newDs,
            tc: newTc,
         },
      });
   }, [dsMa]);
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
                  chonTay && hydrate
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
