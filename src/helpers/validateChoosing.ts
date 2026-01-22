import TkbDTO from "@/types/tkbDTO";
import { useTkb } from "@/zus/tkb";
//Ham dung de kiem tra tinh hop le khi pick 1 mon hoc 
//Chon binh thuong 
function isValid(course : TkbDTO , data : any )
{
    const courses = data.ds 
    const tc = data.tc 
    //Kiem tra xem mon hoc co ton tai khong ? 

    const maTrung = [] 
    
    //So TC khong duoc vuot qua 30 
    if (tc + course.SoTc > 30) return {
        success: false, 
        message: "Bạn đã vượt số tín chỉ tối đa"
    }
    //kiem tra xem co mon hoc nao co ma trung khong 
    for (const [key , value] of courses.entries()) 
    {
        if (course.MaMH == value.MaMH) return {
            success: false, 
            message: "Môn học đã được chọn" 
        }
        if (course.Thu == value.Thu) 
        {
            const tietHoc = String(value.Tiet) 
            const tietHocDaChon = String(course.Tiet) 
            for (let i = 0; i < tietHoc.length; ++i) {
                for (let j = 0; j < tietHocDaChon.length; ++j) if (tietHoc[i] != '*' && tietHocDaChon[j] != '*' && tietHoc[i] == tietHocDaChon[j]) {
                    maTrung.push(course.MaLop) 
                    break 
                }
            }
        }
    } 
    if (maTrung.length) return {
        success: false, 
        message: "Môn học bị trùng với: " + maTrung.join(',')
    }
    //Thuc hien update lai danh dach mon hoc 
    return {
        success: true, 
        message: "Chọn môn thành công"
    } 
}
//Chon tay 
function kiemTraChonTay(courses : any , monHocDangKy : TkbDTO)   
//Danh muc mon hoc, courses: mon hoc da dang ky, maLop dang ky 
{
    if (courses.tc + monHocDangKy.SoTc > 30) return false 
    for (const [key , value] of courses.ds.entries()) 
    {
        if (value.MaMH == monHocDangKy.MaMH) return false //Da dang ky mon nay 
        if (monHocDangKy.Thu == value.Thu)
        {
            const tietHoc = String(value.Tiet) 
            const tietHocDaChon = String(monHocDangKy.Tiet) 
            for (let i = 0; i < tietHoc.length; ++i) {
                for (let j = 0; j < tietHocDaChon.length; ++j) if (tietHoc[i] != '*' && tietHocDaChon[j] != '*' && tietHoc[i] == tietHocDaChon[j]) 
                    return false //Neu nhu bi trung mon hoc 
            }
        }
    }
    return true 
}

export {isValid , kiemTraChonTay}