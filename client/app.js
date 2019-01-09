import React from 'react'

import {Navbar, Header, Footer, AllItems, SideBar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      {/* might need to put somewhere else because not all pages have header */}
      <Navbar />
      <Header />
      {/* switch happens */}
      <main>
        <SideBar />
        <AllItems />
      </main>
      {/* right here */}
      <Footer />
    </div>
  )
}

export default App
