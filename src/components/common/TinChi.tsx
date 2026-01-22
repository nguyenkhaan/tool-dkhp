'use client' 
import { useTkb } from "@/zus/tkb"
import { cn } from "@/lib/utils"
const tcColor = (soTc : number) => {
    if (soTc <= 12) return 'text-red-600' 
    return 'text-green-600'
}
const TinChi = () => 
{
    const courses = useTkb((state) => state.courses)
    return (
        <p className={cn('font-medium text-base' , tcColor(courses.tc))}>
            Tổng số tín chỉ: <span style={{
                color: 'red'
            }}>{courses.tc}</span>
        </p>
    )
}
export default TinChi