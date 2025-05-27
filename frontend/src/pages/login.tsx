import Header from '@/components/Header'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()



    const loginHandler = () => {
        if (username === 'pisync@pw.live' && password === '1234') {
            Cookies.set('authorized', 'true');
            setUsername('')
            setPassword('')
            router.push('/')
        } else {
            alert('Username and password combination is wrong');
        }
    };
    return (
        <>
            <Header />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-md p-10 rounded-md flex w-[80vw] h-[80vh]">

                    {/* Left Side - Logo */}
                    <div className="flex-1 flex justify-center items-center">
                        <Image
                            src="/pisync-logo.png"
                            alt="PiSync Logo"
                            width={120}
                            height={120}
                        />
                    </div>

                    {/* Right Side - Form */}
                    <div className="flex-1 flex flex-col justify-center">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            className="mb-4 px-4 py-2 border border-gray-300 rounded"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="mb-2 px-4 py-2 border border-gray-300 rounded"
                        />
                        <div className="text-right mb-4">
                            <Link href="#" className="text-sm text-teal-600 font-medium">
                                Forgot password
                            </Link>
                        </div>
                        <button className="bg-black text-white py-2 rounded hover:bg-gray-800 transition cursor-pointer" onClick={loginHandler}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage
