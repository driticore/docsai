import { Navbar } from '@/components/Navbar'
import React from 'react'

function Layout({children}:{children?:React.ReactNode}) {
  return (
    <>
    <div className='min-h-screen'>
          {children}
    </div></>
  )
}

export default Layout
