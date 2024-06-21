import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { About, ContactUs, Login, ForgotPasswordPage, Signup, VerifyOTP, Registration,Matches } from './Pages/Index.js'
import './index.css'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<App />} />
      <Route path='Signup' element={<Signup />} />
      <Route path='Signup/verifyOTP/:id' element={<VerifyOTP />} />
      <Route path='Login' element={<Login />} />
      <Route path='About' element={<About />} />
      <Route path='ContactUs' element={<ContactUs />} />
      <Route path='Matches' element={<Matches />} />
      <Route path='forgot-password' element={<ForgotPasswordPage />} />
      <Route path='Registration' element={<Registration />} />
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}>
    </RouterProvider>
  </Provider>
)
