import { Route ,Routes } from 'react-router-dom'
import appRoute from './component/header/appRoute'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./component/header/ProtectedRoute"; 



function App() {

  return (
   <>
   {/* <Routes>
    {appRoute.map((item,id)=>(
      <Route key={id} path={item.path} element={<item.Component/>}/>
    ))}
   </Routes> */}

   <Routes>
  {appRoute.map((item, id) => (
    <Route
      key={id}
      path={item.path}
      element={
        item.role ? (
          <ProtectedRoute roleRequired={item.role}>
            <item.Component />
          </ProtectedRoute>
        ) : (
          <item.Component />
        )
      }
    />
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
