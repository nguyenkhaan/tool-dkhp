import {create} from 'zustand'
import TkbDTO from '@/types/tkbDTO'
import mappingData from '@/helpers/xlsxToJson';
import * as XLSX from "xlsx";
import Tracker from '@/track/tracker';
type selectedCourseType = {
   ds: Map<string , TkbDTO>, 
   tc: number, 
}
type TkbType = {
    tkbData: Map<string , TkbDTO>, 
    setTkb: (file : File) => Promise<number>, //1: OK, 2: File khong dung dinh dang  
    initTkb: (data : Map<string , TkbDTO>) => void , 
    choose: (data : TkbDTO) => boolean, 
    unchoose: (data : TkbDTO) => boolean, 
    selectedCourses: selectedCourseType 
} 
const useTkb = create<TkbType>((set) => ({
    tkbData: new Map(), 
    selectedCourses: {
      ds: new Map(), 
      tc : 0 //Ban dau chua chon bat cu mon gi 
    }, 
    initTkb: (data) => {
         set({
            tkbData : data 
         })
    }, 
    setTkb: async (file : File) => {
        return new Promise((resolve , reject) => {
            try 
            {
               const reader = new FileReader();
               const rABS = !!reader.readAsBinaryString;
               reader.onerror = () => reject(new Error("FileReader error"));
               reader.onload = (e) => 
                {
                  const bstr = e?.target?.result;
                  const wb = XLSX.read(bstr, {
                     type: rABS ? "binary" : "array",
                  });
                  const wsLyThuyet = wb.Sheets[wb.SheetNames[0]];
                  const wsThucHanh = wb.Sheets[wb.SheetNames[1]];
                  const dataLyThuyet = XLSX.utils.sheet_to_json<any[][]>(
                     wsLyThuyet,
                     { header: 1 },
                  );
                  const dataThucHanh = XLSX.utils.sheet_to_json<any[][]>(
                     wsThucHanh,
                     { header: 1 },
                  );
                  const dataInArray = [...dataLyThuyet, ...dataThucHanh].filter(
                     (row) => typeof row[0] === "number", // những row có cột 0 là STT (STT là number) thì mới là data ta cần
                  );
                  if (dataInArray && dataInArray.length) 
                  {
                    const data = mappingData(dataInArray)
                    //Thuc hien ghi de lai tkb trong local Storage 
                    localStorage.setItem('tkb' , JSON.stringify(Array.from(data.entries()))) 
                    console.log('Da luu tkb vao locaStorage') 
                    set({tkbData : data})
                     
                    resolve(1) 
                  }
                  else resolve(2) 
               };
               if (rABS) reader.readAsBinaryString(file) 
                  else reader.readAsArrayBuffer(file) 
            } 
            catch (err) 
            {
                reject(err) 
            }
        }) 
    }, 
    choose: (data : TkbDTO) => {
      //Ham dung de chon mon cho thoi khoa bieu, no se tien hanh load sang ben bang bieu 
      return true 
    }, 
    unchoose: (data : TkbDTO) => {
      //Ham dung de bo chon 1 mon cho thoi khoa bieu 
      return true 
    }
})) 
export {useTkb}