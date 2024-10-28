import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dynamicpg from './pages/Dynamicpg';
import Dynamicpg2 from './pages/Dynamicpg2';
import Admin from './admin/Admin';
import Orders from './admin/Orders';
import AdminRoute from './ui_comp/AdminRoute';
import Myorders from './ui_comp/Myorders';
import Search from './ui_comp/Search';

const root = ReactDOM.createRoot(document.getElementById('root'));
let allroutes = createBrowserRouter(
  [
    {
      path:'/',
      element:<App/>
    },
    {
      path:'dynpage/:id',
      element:<Dynamicpg/>
    },
    {
      path:'dynpage2/:id',
      element:<Dynamicpg2/>
    },
    {
      path:'/myorders',
      element:<Myorders />
    },
    {
      path:'/search/:query',
      element:<Search />
    },
    // Admin panel start
    {
      path: '/admin',
      element: <AdminRoute element={<Admin />} />
    },
    {
      path: '/orders',
      element: <AdminRoute element={<Orders />} />
    },
  ]
)
root.render(
  <React.StrictMode>
    <RouterProvider router={allroutes}/>
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();