import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UpdatePost from '../Components/UpdatePost.jsx';
import { createBrowserRouter, RouterProvider, Routes } from 'react-router-dom';
import App from './App.jsx'
import AddPost from '../Components/Addpost.jsx';


const router=createBrowserRouter([
  {
    path: '/',  
    element: <App />,
    errorElement: <div>Error 404</div>,
    children: [
      {
        path:'/add/post',
        element: <AddPost />
      },
      {
        path:'/update/post/:id',
        element: <UpdatePost />
      }
    ]
  },
  
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
    {/* <App /> */}
  </StrictMode>,
)