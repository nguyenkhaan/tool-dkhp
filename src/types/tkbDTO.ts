type TkbDTO = {
    STT: any,
    MaMH: any,
    MaLop: any,
    TenMH: any,
    MaGV: any,
    TenGV: any,
    SiSo: any,
    SoTc: number, //parseInt(r[7]),
    ThucHanh: any,
    HTGD: any,
    Thu: string, //String(r[10]),
    Tiet: string,
    CachTuan: string,//String(r[12]),
    PhongHoc: any,
    KhoaHoc: string,
    HocKy: string,
    NamHoc: string,
    HeDT: any,
    KhoaQL: any,
    NBD: any, 
    NKT: any,
    GhiChu: any,
    NgonNgu: any,
} 
export type selectedCourseType = {
   ds: Map<string , TkbDTO>, 
   tc: number, 
}
export type selectedCourseResponseType = {
    success: boolean, 
    message: string 
}
export default TkbDTO
