
// import './App.css'
// import Login from './component/login/Login'
// import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
// import Signup from './component/singup/Signup'
// import Sign from './component/singup/Sign'
// import Dashboard from './component/dashboard/Dashboard'
// import { createContext ,useContext,useState,useEffect} from 'react'
// import { themes , ThemeContext } from './context/themeContext'
// import Double_number from './component/memoi/double_number'
// import Callback from './component/callback/Callback'
// import Apicall from './component/callback/Apicall'
// import User from './component/user/User'
// import Add_User from './component/user/Add_User'
// import Order from './component/order/Order'
// import Product from './component/product/Product'
// import Footer from './component/footer/Footer'
// import Item from './component/product/Item'
// import Cart from './component/product/Cart'
// import Home from './component/home/Home'









// function App() {
//   const [theme,setTheme]=useState(themes.light)
//     function handleOnClick(){
//       theme===themes.light ? setTheme(themes.dark):setTheme(themes.light);
      
//     }
    
//     useEffect(() => {
//     const body = document.body;
//     if (theme === themes.light) {
//       body.classList.remove("bg-dark", "text-light");
//       body.classList.add("bg-light", "text-dark");
//     } else {
//       body.classList.remove("bg-light", "text-dark");
//       body.classList.add("bg-dark", "text-light");
//     }
//   }, [theme]);
//   return (
//     <>
//       <div className={`app-container ${theme}`}>
//       <ThemeContext.Provider value={{theme,handleOnClick}}>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Dashboard/>}/>
//           <Route path="/sign" element={<Sign/>}/>
//           <Route path="/login" element={<Login/>}/>
//           <Route path="/double" element={<Double_number/>}/>
//           <Route path="/callback" element={<Callback/>}/>
//           <Route path="/api" element={<Apicall/>}/>
//           <Route path="/user" element={<User/>}/>
//           <Route path="/add_user" element={<Add_User/>}/>
//           <Route path="/order" element={<Order/>}/>
//           <Route path="/product" element={<Product/>}/>
//           <Route path="/product/:id" element={<Item/>}/>
//           <Route path="/cart" element={<Cart/>}/>
//           <Route path="/home" element={<Home/>}/>
//         </Routes>
//       </Router>
//       <Footer/>
//       </ThemeContext.Provider>
//       </div>
//     </>
//   )
// }

// export default App



import { Route ,Routes } from 'react-router-dom'
import appRoute from './component/header/appRoute'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {

  return (
   <>
   <Routes>
    {appRoute.map((item,id)=>(
      <Route key={id} path={item.path} element={<item.Component/>}/>
    ))}
   </Routes>
     <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
   </>
  )
}

export default App
