import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

 
  useEffect(() => {
    // Check for the 'authorized' cookie
    const isAuthorized = Cookies.get('authorized');
    if (!isAuthorized) {
      // If not authorized, redirect to login page
      router.push('/login');
    }else{
      setIsLoggedIn(isAuthorized === 'true')
    }
  }, [router]);
  const handleLogout = () => {
    Cookies.remove('authorized')
    setIsLoggedIn(false)
    router.push('/login') // or '/login' based on your route
  }

  return (
    <div className="bg-[#6D0707] p-2 h-10 text-white font-bold flex items-center justify-between px-4">
      <h1>PiSync Admin Dashboard</h1>
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="bg-white text-[#6D0707] px-2 py-1 rounded text-sm font-normal mr-10 cursor-pointer"
        >
          Logout
        </button>
      )}
    </div>
  )
}

export default Header