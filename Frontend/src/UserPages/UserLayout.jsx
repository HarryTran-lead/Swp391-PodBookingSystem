import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'

export default function UserLayout({children}) {
  return (
    <div>
       <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
