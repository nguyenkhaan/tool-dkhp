"use client";
import { useTkb } from "@/zus/tkb";

import ChonFile from "@/pages/1/ChonFile";
import LearnedCourse from "@/pages/2/LearnedCourse";
import Scheduled from "@/pages/3/Scheduled";
import TimetableGrid from "@/pages/4/TimetableGrid";

export default function MainDashboard() {
   const activeTab = useTkb((state) => state.activeTab);

   return (
      /**
       * 1. h-screen w-full overflow-hidden: Khóa chặt khung nhìn bằng đúng kích thước màn hình.
       * 2. flex: Để Sidebar và Main nằm cạnh nhau.
       */
      <div className="flex h-screen overflow-hidden bg-background">
         
         <main className="flex-1 relative h-full w-full overflow-hidden">
            
            {/* Tab Home - Padding được đặt ở đây */}
            <div className={`h-full w-full p-6 pr-16 overflow-y-auto ${activeTab === 1 ? 'block' : 'hidden'}`}>
               <ChonFile />
            </div>

            {/* Tab Đã học */}
            <div className={`h-full w-full p-6 pr-16 overflow-y-hidden ${activeTab === 2 ? 'block' : 'hidden'}`}>
               <LearnedCourse />
            </div>

            {/* Tab CHỌN MÔN - Tab này không được dùng overflow-y-auto ở đây vì Scheduled có ScrollArea riêng */}
            <div className={`h-full w-full p-0 ${activeTab === 3 ? 'block' : 'hidden'}`}>
               {/* LƯU Ý: Nếu muốn Scheduled có khoảng trống lề mà không hỏng scroll, 
                  hãy vào file Scheduled.tsx và thêm padding vào container chứa Table.
               */}
               <Scheduled />
            </div>

            {/* Tab Xếp lịch */}
            <div className={`h-full w-full p-6 pr-16 overflow-y-auto ${activeTab === 4 ? 'block' : 'hidden'}`}>
               <TimetableGrid />
            </div>
         </main>
      </div>
   );
}