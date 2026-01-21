'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) 
{
  const [email , setEmail] = useState('') 
  const [password , setPassword] = useState('') 
  const router = useRouter() 
  const handleEmailChange = (e : any) => {
    setEmail(e.target.value) 
  } 
  const handlePasswordChange = (e : any) => {
    setPassword(e.target.value) 
  }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); //Chan reload trang 
  //Vi trang nay chi co 1 chut nen uu tien su dung useState cho do phuc tap 

  console.log("Email:", email);
  console.log("Password:", password);

  // Gửi API login ở đây
  const toastID = toast.success('Đăng nhập thành công')
  
  router.push('/home/1')
};

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Enter your account</CardTitle>
          <CardDescription>
            Enter the student account to continue 
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="24520059@example.com"
                  required
                  value={email} 
                  onChange={handleEmailChange}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input id="password" type="password" required onChange={handlePasswordChange} value={password} />
              </Field>
              <Field>
                <Button type="submit" className="bg-blue-700 cursor-pointer hover:bg-blue-900 transition-all">Login</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
