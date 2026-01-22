'use client'
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { PostHogProvider } from "posthog-js/react";
import posthog from "posthog-js";
import Tracker from "@/track/tracker";
import { useTkb } from "@/zus/tkb";
import { useEffect } from "react";
import TkbDTO from "@/types/tkbDTO";
export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const api_key = process.env.NEXT_PUBLIC_POSTHOG_API as string;
   const host = process.env.NEXT_PUBLIC_POSTHOG_HOST as string;
   posthog.init(api_key, {
      api_host: host,
      persistence: "localStorage",
      autocapture: false,
   });
   Tracker.login('tester' , {
      email: '24520059', 
   })
   return (
      <html lang="en">
         <body className="antialiased">
            <Toaster position="top-center" reverseOrder={false} />
            <PostHogProvider client={posthog}>
               <main className="w-screen h-screen overflow-x-hidden">
                  {children}
               </main>
            </PostHogProvider>
         </body>
      </html>
   );
}
