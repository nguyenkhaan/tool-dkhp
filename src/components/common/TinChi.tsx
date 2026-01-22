'use client' 
import { useTkb } from "@/zus/tkb"
import { cn } from "@/lib/utils"
import { useShallow } from "zustand/react/shallow"
const tcColor = (soTc : number) => {
    if (soTc <= 12) return 'text-red-600' 
    return 'text-green-600'
}
const TinChi = () => 
{
    const {chonTay , courses , coursesChonTay} = useTkb(
        useShallow((state) => ({
            courses: state.courses, 
            coursesChonTay : state.coursesChonTay, 
            chonTay : state.chonTay
        }))
    )
    return (
        <p className={cn('font-medium text-base' , (chonTay ? tcColor(coursesChonTay.tc) : tcColor(courses.tc)))}>
            Số tín chỉ: <span style={{
                color: 'red'
            }}>{
                (chonTay? coursesChonTay.tc : courses.tc) 
            }</span>
        </p>
    )
}
export default TinChi