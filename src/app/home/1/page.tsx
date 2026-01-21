"use client";
import { useState, useRef, useEffect } from "react";
import InformationButton from "../components/InformationButton";
import { Button } from "@/registry/ui/button";
import { useTkb as useTKB } from "@/zus/tkb";
import toast from "react-hot-toast";
import Tracker from "@/track/tracker";

const App = () => {
   const [fileName, setFileName] = useState<string>('');
   const [isMounted, setIsMounted] = useState(false); 
   const inputRef = useRef<HTMLInputElement | null>(null);
   const setTkb = useTKB((state) => state.setTkb);
   useEffect(() => {
      setIsMounted(true);
      const savedName = Tracker.getProperty('filename');
      if (savedName) setFileName(savedName);
   }, []);

   const handleUploadClick = () => {
      inputRef.current?.click();
   };
   const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const upload = e.target.files?.[0];
      if (!upload) return;

      const isXlsx = upload.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      if (!isXlsx) {
         toast.error("Định dạng file không hợp lệ");
         e.target.value = "";
         return;
      }
      const toastID = toast.loading('Đang xử lí...');
      try {
         const results = await setTkb(upload);
         if (results === 1) {
            toast.success('Xử lí thành công', { id: toastID });
            
            //Vay thi cai posthog/tracker nay co tac dung gi ? 
            setFileName(upload.name);
            Tracker.save('filename' , upload.name) 
         } else {
            toast.error('File không đúng định dạng', { id: toastID });
         }
      } catch (error) {
         toast.error('Lỗi xử lí file', { id: toastID });
      } finally {
         e.target.value = ""; 
      }
   };

   const buttonText = !isMounted 
      ? "Đang tải..." 
      : (!fileName ? "Upload an excel file" : `Đã upload ${fileName}`);

   return (
      <div className="w-full h-full pt-8 pr-12">
         <div className="flex items-center justify-start gap-5">
            <input
               type="file"
               ref={inputRef}
               onChange={handleChange}
               accept=".xlsx"
               className="hidden"
            />
            
            <Button 
               variant={"ctUpload"} 
               onClick={handleUploadClick}
               disabled={!isMounted}
            >
               {buttonText}
            </Button>

            <span className="text-base font-md">
               Ví dụ{" "}
               <a className="text-blue-600 underline" target="_blank" href="https://daa.uit.edu.vn/...">
                  File thời khóa biểu dự kiến CK2 năm học 2025 2025
               </a>
               {" "}Tải{" "}
               <a target="_blank" className="underline text-blue-600" href="/data/tkb.xlsx">
                  TKB Dự kiến CK2 năm học 2025 - 2026
               </a>
            </span>
         </div>
         
         <ul className="flex items-center flex-col justify-baseline gap-4 my-4">
            {[1, 2, 3].map((i) => <InformationButton key={i} />)}
         </ul>
      </div>
   );
};

export default App;