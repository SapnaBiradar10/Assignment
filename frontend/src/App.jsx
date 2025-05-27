
import { Route, Routes, Link, useNavigate} from 'react-router-dom'
import Home from './Routing/Home'
// import PageNotFound from './Routing/PageNotFound'
import Products from './Routing/Products'
// import Users from './Routing/Users'
// import Login from './ContextApi/Login'
// import Signup from './ContextApi/Signup'
// import { useState } from 'react'

import Wishlist from './Routing/Wishlist'
import ProtectedRoute from './Routing/ProtectedRoute'
import AuthForm from './Routing/Authform'
import About from './Routing/About'


function App() {
  // const[search,setSearch]=useState()
  // const navigate=useNavigate()
  // const inputHandler=()=>{
  //   navigate(`/${search}`)
  // }

  return (
    <>

      <nav className="navbar navbar-expand-lg  bg-dark">
        <div className="container-fluid">
          < Link to="/" className="navbar-brand text-white" >Home</Link>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-4 mb-2 mb-lg-0">

              <li className="nav-item">
                <Link to="/pro" className="nav-link text-white">Products</Link>
              </li>
          
              <li className="nav-item">
                <Link to="/wish" className="nav-link text-white">Wishlist</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link text-white">About</Link>
              </li>


            </ul>
            {/* <form style={{marginLeft:"auto"}} className="d-flex ms-auto" role="search">
              <input className="form-control me-3" type="search" placeholder="Search"  onChange={(e)=>setSearch(e.target.value)}/>
              <button className="btn btn-outline-light " type="button" onClick={inputHandler}>Search</button>
            </form> */}

          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute></ProtectedRoute>}>
        
        <Route path="/pro" element={<Products></Products>}></Route>
        <Route path="/wish" element={<Wishlist></Wishlist>}></Route>
        <Route path='/about' element={<About></About>}/>
        </Route>
     
        <Route path='/auth' element={<AuthForm></AuthForm>}/>
      </Routes>
    </>
  )
}

export default App
