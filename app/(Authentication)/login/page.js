"use client";

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { Login } from "@/utils/auth"
import { userStore } from "@/stores/user";
import { RotateCw } from 'lucide-react';

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUserData } = userStore();
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter()

    const handleLogin = async () => {
        try {
            setIsLoading(true)
            const userData = await Login({ email: email, password: password })
            setUserData(userData);
            setIsLoading(false)
            toast.success(`Welcome back, ${userData.firstName} ${userData.lastName} !`)
            router.push("/home")

        }
        catch (error) {
            toast.error(error.response.data.message)
            console.error(error)
            setIsLoading(false)
        }
    }

    return (
        <div className="mx-auto grid w-[400px] gap-4">
            <div className="flex justify-center mb-4">
                <Image
                    src="/images/redaa-logo.png"
                    alt="Redaa Logo"
                    width={180}
                    height={60}
                    priority
                    className="object-contain"
                />
            </div>
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Button className="w-full" onClick={() => { handleLogin() }} disabled={isLoading}>
                    {
                        isLoading ?
                            (
                                <>
                                    <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait ...
                                </>
                            ) :
                            (
                                <>
                                    Login
                                </>
                            )
                    }
                </Button>
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline">
                    Sign up
                </Link>
            </div>
        </div>
    )
}

export default LoginPage;