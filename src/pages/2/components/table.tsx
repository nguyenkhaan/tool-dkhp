import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/ui/table"

export function CourseRegistrationTable() {
  return (
    
    <div className="rounded-md border overflow-y-scroll h-full relative">
      <Table className="min-w-[1200px] h-full">  
        <TableHeader className="sticky top-0 bg-secondary z-10">
          <TableRow>
            <TableHead className="w-63">MÔN HỌC</TableHead>
            <TableHead className="w-38">MÃ LỚP</TableHead>
            <TableHead className="w-50">TÊN GIẢNG VIÊN</TableHead>
            <TableHead className="w-50">GVTH</TableHead>
            <TableHead className="w-25">HỆ ĐT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(30)].map((_, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium text-blue-700">MA004 - Cấu trúc rời rạc</TableCell>
              <TableCell>MA004.O21</TableCell>
              <TableCell>Hà Mạnh Linh</TableCell>
              <TableCell>Hà Mạnh Linh</TableCell>
              <TableCell>CQUI</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}