'use client'
import { Calendar, Home, Inbox, Search, Settings, NotebookPen  } from "lucide-react";
import Image from "next/image";
import { MessageCircleQuestionMark, Github } from "lucide-react";
import { TypingAnimation } from "@/registry/ui/typing-animation";
import { Button } from "@/registry/ui/button";
import Link from "next/link";
import {
   Sidebar,
   SidebarContent,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from "@/registry/ui/sidebar";

// Menu items.
const items = [
   {
      title: "Home",
      url: "/home/1",
      icon: Home,
   },
   {
      title: "Đã học",
      url: "/home/2",
      icon: Inbox,
   },
   {
      title: "Chọn môn",
      url: "/home/3",
      icon: NotebookPen,
   }, 
   {
      title: "Xếp lịch",
      url: "/home/4",
      icon: Calendar,
   }
];

export function AppSidebar() {
   return (
      <Sidebar>
         <SidebarContent>
            <SidebarGroup>
               <Image
                  src={"/logo.png"}
                  alt=""
                  width={140}
                  height={140}
                  className="my-8 mx-auto"
               />
               <SidebarGroupContent>
                  <SidebarMenu>
                     {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                           <SidebarMenuButton
                              variant={"ghost"}
                              text={"lg"}
                              asChild
                           >
                              <Link href={item.url}>
                                 <item.icon />
                                 <span>{item.title}</span>
                              </Link>
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                     ))}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
            <div className="w-full h-full py-12 flex-col gap-3 flex items-center justify-end">
               <MessageCircleQuestionMark
                  strokeWidth={2.5}
                  size={42}
                  color="#376db3"
               />
               <TypingAnimation
                  loop
                  typeSpeed={50}
                  deleteSpeed={100}
                  className="leading-6 text-lg"
               >
                  Like & Share
               </TypingAnimation>
               <div className="flex items-center border border-gray-300 mx-auto justify-between overflow-hidden font-bold cursor-pointer text-black gap-0.5 text-sm bg-gray-200 rounded-sm">
                  <a href="/" className="cursor-pointer bg-transparent flex-1">
                     <Button variant={"ctRating"} size={"sm"}>
                        <Github size={124} strokeWidth={2.5} />
                        Star
                     </Button>
                     
                  </a>
                <span className="flex-1 bg-gray-100 px-3 w-full h-full flex items-center">508</span>
               </div>
            </div>
         </SidebarContent>
      </Sidebar>
   );
}
//Quy tac lam Shadcn
/**
 * Dung className dai di, khong duoc thi vao source code de chinh sua
 * Thong thuong className chi co tac dung voi 1 so cai nhu mau nen, mau chu, mau sac,c hieu cao. Chinh style nhe thi className. Khong duoc thi
 * vao source code viet variants va truyen props vao
 */
