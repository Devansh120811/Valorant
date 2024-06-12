import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { About, ContactUs, Login, ForgotPasswordPage,Signup,VerifyOTP } from './Pages/Index.js'
import './index.css'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Login />} />
      <Route path='Signup' element={<Signup/>}/>
      <Route path='Signup/verifyOTP' element={<VerifyOTP/>}/>
      <Route path='Home' element={<App />} />
      <Route path='About' element={<About />} />
      <Route path='ContactUs' element={<ContactUs />} />
      <Route path='forgot-password' element={<ForgotPasswordPage />} />
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}>
    </RouterProvider>
  </Provider>
)
