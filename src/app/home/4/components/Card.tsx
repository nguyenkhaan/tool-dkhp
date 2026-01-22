//Lam sao de cho card hien thi dung vao Thu va tiet tren bang Table ?
import { offset } from "@/helpers/offset";
import TkbDTO from "@/types/tkbDTO";
const Card = ({ course }: { course: TkbDTO }) => {
   const [left, top, height] = offset(course);

   return (
      <div
         className="absolute bg-blue-200 border border-blue-300 px-2 z-10 rounded-md flex flex-col items-center justify-center"
         style={{
            left: `${left}px`, //(Thu - 2) * 200px + 160 vd: Thu 2 -> (2 - 1) * 160px
            top: `${top}px`, // 40 + (Tiet bat dau - 1) * 64
            width: `200px`,
            height: `${height}px`, // So tiet * 64px
            //Vi du: Thu 4, tiet 3456
         }}
      >
         <p className="font-semibold text-center">{course.MaLop} {course.NgonNgu}</p>
         <p className="text-center">{course.TenMH}</p>
         <p className="font-semibold text-center">{course.TenGV}</p>
         <p className="text-center">{course.PhongHoc}</p>
         <p className="text-center">BD: {course.NBD}</p>
         <p className="text-center">KT: {course.NKT}</p>
      </div>
   );
};
export default Card;
