"use client"
import TimeTable from "./components/TimeTable"

const TimetableGrid = () => {

  return (
    <div className="w-full overflow-x-auto rounded-md border px-8 pt-10">
        <h2 className="mb-5 font-bold text-3xl">Thời khóa biểu</h2>
        <TimeTable /> 
    </div>
  )
}

export default TimetableGrid
