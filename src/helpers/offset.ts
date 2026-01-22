import TkbDTO from "@/types/tkbDTO";

function offset(course : TkbDTO) 
{
    const left = (Number(course.Thu) - 2) * 200 + 160 
    const top = (Number(course.Tiet[0]) - 1) * 64 + 40 
    const height = String(course.Tiet).length * 64 
    return [left , top , height]
} 
export {offset}