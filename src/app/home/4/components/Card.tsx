//Lam sao de cho card hien thi dung vao Thu va tiet tren bang Table ?
import { offset } from "@/helpers/offset";
import TkbDTO from "@/types/tkbDTO";
const Card = ({ course }: { course: TkbDTO }) => {
   const [left, top, height] = offset(course);

   return (
      <div
         className="absolute bg-blue-200 z-10 rounded-md flex flex-col items-center justify-center"
         style={{
            left: `${left}px`, //(Thu - 2) * 200px + 160 vd: Thu 2 -> (2 - 1) * 160px
            top: `${top}px`, // 40 + (Tiet bat dau - 1) * 64
            width: `200px`,
            height: `${height}px`, // So tiet * 64px
            //Vi du: Thu 4, tiet 3456
         }}
      >
         <p className="font-semibold">MA004.O21 - VN</p>
         <p>Cấu trúc rời rạc</p>
         <p className="font-semibold">Hà Mạnh Linh</p>
         <p>C109</p>
         <p>BĐ: 2024-02-19</p>
         <p>KT: 2024-06-08</p>
      </div>
   );
};
export default Card;
