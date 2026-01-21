import { CourseRegistrationTable } from "./components/table";
const LearnedCourse = () => {
   return (
      <div className="w-full h-screen flex flex-col py-8 overflow-x-scroll  pr-6">
         <h2 className="font-bold text-2xl mb-3">Các khóa học đã đăng ký</h2>
         <div className=" w-full h-full overflow-y-scroll">
            <CourseRegistrationTable />
         </div>
      </div>
   );
};
export default LearnedCourse;
