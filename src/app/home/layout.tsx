import { SidebarProvider, SidebarTrigger } from "@/registry/ui/sidebar";
import { AppSidebar } from "@/components/common/Sidebar";
import { Toaster } from "react-hot-toast";
export default function Layout({ children }: { children: React.ReactNode }) 
{
   return (
      <>
         <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="w-screen h-screen overflow-hidden">
               {children}
            </div>
         </SidebarProvider>
      </>
   );
}
