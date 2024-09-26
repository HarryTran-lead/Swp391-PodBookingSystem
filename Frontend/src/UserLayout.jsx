import React from 'react'
import Header from './UserPages/Header/Header'
import Footer from './UserPages/Footer/Footer'

export default function UserLayout({children}) {
  return (
    <div>
       <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
