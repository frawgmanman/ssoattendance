import React from 'react'
import Image from 'next/image'

const Header = () => {
  return (
    <div className = "h-[70px] flex flex-row gap-0.5 p-2 drop-shadow-2xl content-center">
        <Image       
        src="/sso.png"
        width={70}
        height={30}
        alt="SSO Logo"/>
        <h1 className = "font-bold p-3">SSO Attendance</h1>
    </div>
  )
}

export default Header

