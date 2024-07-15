import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { About, ContactUs, Login, ForgotPasswordPage, Signup, VerifyOTP, Registration, Matches } from './Pages/Index.js'
import './index.css'
import { Navigate } from 'react-router-dom'
const UserType = {
  PUBLIC_USER: "PUBLIC_USER",
  PRIVATE_USER: "PRIVATE_USER"
}

const Authenticated = window.localStorage.getItem("authStatus")
console.log(Authenticated)
const CurrentUser_Type = Authenticated ? UserType.PRIVATE_USER : UserType.PUBLIC_USER
function PUBLIC({ children }) {
  if (CurrentUser_Type === UserType.PUBLIC_USER) {
    return <>{children}</>
  }
  else {
    return <Navigate to={"/"} />
  }
}
function PRIVATE({ children }) {
  if (CurrentUser_Type === UserType.PRIVATE_USER) {
    return <>{children}</>
  }
  else {
    // console.log("1")
    return <Navigate to={"/Login"} />
  }
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<App />} />
      <Route path='Signup' element={<PUBLIC><Signup /></PUBLIC>} />
      <Route path='Signup/verifyOTP/:id' element={<VerifyOTP />} />
      <Route path='Login' element={<PUBLIC><Login /></PUBLIC>} />
      <Route path='About' element={<PRIVATE><About /></PRIVATE>} />
      <Route path='ContactUs' element={<PRIVATE><ContactUs /></PRIVATE>} />
      <Route path='Matches' element={<PRIVATE><Matches /></PRIVATE>} />
      <Route path='forgot-password' element={<ForgotPasswordPage />} />
      <Route path='Registration' element={<PRIVATE><Registration /></PRIVATE>} />
      <Route path='*' element={<div className='bg-black text-white h-screen w-screen flex justify-center items-center'>Page not Found!</div>} />
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}>
    </RouterProvider>
  </Provider>
)
