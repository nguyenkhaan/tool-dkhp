"use client";

import React, { memo, useCallback, useMemo, useState, useEffect, useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/ui/table";
import { Checkbox } from "@/registry/ui/checkbox";
import { ScrollArea, ScrollBar } from "@/registry/ui/scroll-area";
import { useTkb } from "@/zus/tkb";
import { useShallow } from 'zustand/react/shallow'
import toast from "react-hot-toast";
import TinChi from "@/components/common/TinChi";
// Giữ nguyên Row component đã tối ưu ở bước trước
const Row = memo(({ item, isSelected, onToggle }: any) => {
  const chonTay = useTkb((state) => state.chonTay)
  return (
    <TableRow>
      <TableCell className="text-center text-base">
        <Checkbox 
          checked={isSelected} 
          disabled={chonTay}
          onCheckedChange={(checked) => onToggle(checked, item.MaLop)} 
        />
      </TableCell>
      <TableCell className="border font-medium">{item.TenMH}</TableCell>
      <TableCell className="border">{item.MaLop}</TableCell>
      <TableCell className="border">{item.TenGV}</TableCell>
      <TableCell className="text-center border">{item.Thu}</TableCell>
      <TableCell className="text-center border">{item.Tiet}</TableCell>
      <TableCell className="text-center border">{item.SoTc}</TableCell>
      <TableCell className="border">{item.HeDT}</TableCell>
      <TableCell className="border">{item.KhoaQL}</TableCell>
      <TableCell className="border">{item.ThucHanh}</TableCell>
      <TableCell className="border">{item.CachTuan}</TableCell>
      <TableCell className="border text-center">{item.SiSo}</TableCell>
      <TableCell className="border">{item.PhongHoc}</TableCell>
      <TableCell className="border">{item.KhoaHoc}</TableCell>
      <TableCell className="border">{item.HocKy}</TableCell>
      <TableCell className="border">{item.NamHoc}</TableCell>
      <TableCell className="border">{item.NBD}</TableCell>
      <TableCell className="border">{item.NKT}</TableCell>
      <TableCell className="border">{item.GhiChu}</TableCell>
      <TableCell className="border">{item.NgonNgu}</TableCell>
    </TableRow>
  );
});

const Scheduled = () => {
  const { tkb, coursesDs, hydrated } = useTkb(
    useShallow((state) => ({
      tkb: state.tkbData,
      hydrated: state.hydrate,
      coursesDs: state.courses.ds
    }))
  );

  const choose = useTkb((state) => state.choose);
  const unchoose = useTkb((state) => state.unchoose);

  // Kỹ thuật 1: Trì hoãn render dữ liệu nặng
  const [isPending, startTransition] = useTransition();
  const [displayList, setDisplayList] = useState<any[]>([]);

  const tkbArray = useMemo(() => Array.from(tkb.values()), [tkb]);

  useEffect(() => {
    // Khi mount hoặc tkb thay đổi, đưa việc render mảng lớn vào transition
    // để nhường Main Thread cho các hiệu ứng chuyển trang/animation
    startTransition(() => {
      setDisplayList(tkbArray);
    });
  }, [tkbArray]);

  const handleToggle = useCallback((checked: boolean | "indeterminate", maLop: string) => {
    const toastID = toast.loading(checked ? "Đang chọn lớp..." : "Đang hủy chọn...");
    const response = checked ? choose(maLop) : unchoose(maLop);
    if (response.success) {
      toast.success(response.message, { id: toastID });
    } else {
      toast.error(response.message, { id: toastID });
    }
  }, [choose, unchoose]);

  return (
    <div className="w-full h-screen overflow-x-scroll pr-8 flex flex-col pt-8 pb-16">
      <h2 className="text-3xl font-bold my-5">Danh mục môn học</h2>
      <div className="w-full min-h-0 flex-1 overflow-x-auto">
        <ScrollArea className="h-full w-full rounded-md border">
          <div className="min-w-[1800px]">
            <Table className="text-lg">
              <TableHeader className="sticky top-0 bg-muted z-10">
                <TableRow>
                   {/* Giữ nguyên các TableHead như cũ */}
                   <TableHead className="w-10 px-3">Chọn</TableHead>
                   <TableHead className="border min-w-[160px]">Môn học</TableHead>
                   <TableHead className="border min-w-[120px]">Mã lớp</TableHead>
                   <TableHead className="border min-w-[180px]">Tên giảng viên</TableHead>
                   <TableHead className="border w-16 text-center">Thứ</TableHead>
                   <TableHead className="border w-20 text-center">Tiết</TableHead>
                   <TableHead className="border w-16 text-center">Số TC</TableHead>
                   <TableHead className="border w-22">Hệ ĐT</TableHead>
                   <TableHead className="border w-20">Khoa QL</TableHead>
                   <TableHead className="border w-16">HDTH</TableHead>
                   <TableHead className="border w-24">Cách tuần</TableHead>
                   <TableHead className="border w-16 text-center">Sĩ số</TableHead>
                   <TableHead className="border w-24">Phòng</TableHead>
                   <TableHead className="border w-20">Khóa</TableHead>
                   <TableHead className="border w-20">Học kỳ</TableHead>
                   <TableHead className="border w-24">Năm học</TableHead>
                   <TableHead className="border w-24">NBD</TableHead>
                   <TableHead className="border w-24">NKT</TableHead>
                   <TableHead className="border min-w-[120px]">Ghi chú</TableHead>
                   <TableHead className="border w-24">Ngôn ngữ</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {/* Chỉ render khi đã hydrated và không để trống màn hình quá lâu */}
                {hydrated && displayList.map((item) => (
                  <Row 
                    key={item.MaLop} 
                    item={item} 
                    isSelected={coursesDs.has(item.MaLop)} 
                    onToggle={handleToggle}
                  />
                ))}
              </TableBody>
            </Table>
            
            {/* Kỹ thuật 2: Hiển thị trạng thái loading nhẹ nếu đang render quá nặng */}
            {isPending && (
              <div className="p-4 text-center text-muted-foreground">Đang tải danh sách...</div>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
      <div className="w-full flex items-center my-2 justify-between text-base px-1">
        <TinChi /> 
        <span className="font-bold">{tkbArray.length} dòng</span>
      </div>
    </div>
  );
};

export default Scheduled;