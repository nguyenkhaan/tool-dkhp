import TkbDTO from "@/types/tkbDTO"
import formatDate from "./dateFormat"
//Code dung de chuyen excel thanh json (OK) )
const mappingData = (data : any) => {
   const res : Map<string , TkbDTO> = new Map() 
   for (let r of data) 
   {
         res.set(r[2] as string, 
            {
               STT: r[0],
               MaMH: r[1],
               MaLop: r[2],
               TenMH: r[3],
               MaGV: r[4],
               TenGV: r[5],
               SiSo: r[6],
               SoTc: parseInt(r[7]),
               ThucHanh: r[8],
               HTGD: r[9],
               Thu: String(r[10]),
               Tiet: String(r[11]),
               CachTuan: String(r[12]),
               PhongHoc: r[13],
               KhoaHoc: String(r[14]),
               HocKy: String(r[15]),
               NamHoc: String(r[16]),
               HeDT: r[17],
               KhoaQL: r[18],
               NBD: (Number.isNaN(r[19])) ? r[19] : formatDate(Number(r[19])), 
               NKT: (Number.isNaN(r[19])) ? r[20] : formatDate(Number(r[20])),
               GhiChu: r[21],
               NgonNgu: r[22],

            }
         )
   } 
   return res 
}
export default mappingData