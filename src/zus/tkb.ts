import { create } from 'zustand'
import TkbDTO from '@/types/tkbDTO'
import mappingData from '@/helpers/xlsxToJson';
import * as XLSX from "xlsx";
import { persist, createJSONStorage } from "zustand/middleware"
import { isValid as isValidChoose } from '@/helpers/validateChoosing';
import { selectedCourseType, selectedCourseResponseType } from '@/types/tkbDTO';

//Hook type 
export type TkbType = {
   tkbData: Map<string, TkbDTO>,
   setTkb: (file: File) => Promise<number>, //1: OK, 2: File khong dung dinh dang  
   initTkb: (data: Map<string, TkbDTO>) => void,
   initCourses: (data: selectedCourseType) => void, 
   choose: (maLop: string) => any,
   unchoose: (maLop: string) => boolean,
   courses: selectedCourseType, //Su dung selectedCourse.ds de lay cac mon da pick 
   hydrate: boolean, 
   setHydrate: (v : boolean) => void  
}


//React Hook 
const useTkb = create<TkbType>()(
  persist
  (
    (set, get) => ({
    tkbData: new Map(),
     courses: {
        ds: new Map(),
        tc: 0 //Ban dau chua chon bat cu mon gi 
     },
     hydrate: false, 
     setHydrate: (v : boolean) => {
      set({
        hydrate : v 
      })
     }, 
     initTkb: (data) => {
        set({
           tkbData: data
        })
     },
     initCourses: (data) => {
        set({
            courses : data 
        })
     }, 
     setTkb: async (file: File) => {
        return new Promise((resolve, reject) => {
           try {
              const reader = new FileReader();
              const rABS = !!reader.readAsBinaryString;
              reader.onerror = () => reject(new Error("FileReader error"));
              reader.onload = (e) => {
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
                 if (dataInArray && dataInArray.length) {
                    const data = mappingData(dataInArray)
                    set({ tkbData: data })
                    resolve(1)
                 }
                 else resolve(2)
              };
              if (rABS) reader.readAsBinaryString(file)
              else reader.readAsArrayBuffer(file)
           }
           catch (err) {
              reject(err)
           }
        })
     },
     choose: (maLop: string) => {
        const tkbData = get().tkbData
        const data = tkbData.get(maLop)
        if (!data) return

        const response = isValidChoose(data)
        if (!response.success) return response

        set((state) => {
           const newDs = new Map(state.courses.ds)
           newDs.set(data.MaLop, data)

           return {
              courses: {
                 ds: newDs,
                 tc: state.courses.tc + data.SoTc,
              },
           }
        })
        //Luu du lieu len tren localStorage ? 
        return {
           success: true,
           message: "Đăng ký môn thành công",
        }
     }, 

      unchoose: (maLop: string) => {
        const { courses } = get()   //Ham dung de bo chon mot mon hoc 
        if (!courses.ds.has(maLop)) return false
      
        const data = courses.ds.get(maLop)!
        const newDs = new Map(courses.ds)
        newDs.delete(maLop)
        const newCourses : selectedCourseType = {
          ds : newDs , 
          tc : courses.tc - Number(data.SoTc) 
        }
        set({
          courses: newCourses
        })
        //Luu du lieu len tren localStorage 
        return true
      }
    }), 
    {
        name: 'tkb-storage', 
        storage: createJSONStorage(() => localStorage), 
        partialize: ((state) => ({
          tkbData : state.tkbData instanceof Map? Array.from(state.tkbData.entries()) : state.tkbData,   //Phai dong JSON thu cong 
          courses: {
            ds : state.courses.ds instanceof Map? Array.from(state.courses.ds.entries()) : state.courses.ds, 
            tc: (state.courses.tc) 
          }
        })), 
        onRehydrateStorage: () => (state) => {
          console.log('Dang hydrating')
          console.log(state) 
          if (!state) return 
          state.tkbData = new Map(state.tkbData),   //No da giai JSON o ham ben ngoai roi 
          state.courses.ds  = new Map(state.courses.ds)   //So tin chi da duoc giai nen khong can gan lai nua 
          //Ban chat la no gan tuong ung truong lai, tuong ung khi khai bao trong partialize, sau do o ham nay no gan lai tuong ung, 
          //Du lieu duoc JSON.parse() o buoc truoc, o buoc sau thi se chuyen doi KDL sang Map, khong lien quan gi den JSON nua 
          
          state.hydrate = true //Sau khi da hydrate xong du
        }
    }
  )
) 


export {useTkb}

/**
 * Huong su dung persis storage trong zustand 
 * Co che se tu dong luu tru thong tin vao trong localStorage, tranh tinh trang state bi mat di moi khi trang reload 
 * 1. Khai bao 
 * import {persis , createJSONStorage} from 'zustand/middleware' 
 * 2. Su dung 
 * Ham create luc nay se duoc nang cap 
 * create<type>(persist(
 *    (set , get) => {
 *        //Your code here
 * 
 *    }, 
 *    //Persistent config 
 *    {
 *        //Your config here 
 * 
 *    }
 * )) 
 * 3. Cau hinh cho persistent 
 * - La 1 object 
 *  + name: ten key luu trong localStorage 
 *  + storage: createJSONStorage(() => localStorage), nen co, dac biet voi cac app SSR vi du lieu phai chay tren server truoc, do do no phai 
 *  tao 1 vung nho tam thay cho localStorage 
 *  + partialize: Quyet dinh phan nao se duoc luu vao state 
 *      (state) => ({
 *        key : value 
 * 
 *      })
 *   Rule: Ten key phai trun voi ten truong da duoc khai bao trong state 
 *  + onRehydrateStorage: Khoi phuc lai 
 * 
 *  
 */