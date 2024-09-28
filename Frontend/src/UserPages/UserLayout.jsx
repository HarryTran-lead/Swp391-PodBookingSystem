import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'

export default function UserLayout({children}) {
  return (
    <div>
       <Header />
    

       
      
          <div className=" col-md-14 mt-5">
            <main>{children}</main>
          </div>
        
      
      <Footer />
    </div>
  )
}
