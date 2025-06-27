import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Navbar from "./components/shared/Navbar"
import Login from './components/auth/Login';
import Signup from './components/auth/Signup'
import Home from './components/Home';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './admin/Companies';
import CompanyCreate from './admin/CompanyCreate';
import CompanySetup from './admin/CompanySetup';
import AdminJobs from './admin/AdminJobs'
import PostJob from './admin/PostJob';
import Applicants from './admin/Applicants';
import AdminProfile from './admin/AdminProfile'; // Imported new admin profile component
import ProtectedRoute from './admin/ProtectedRoute';

const appRouter = createBrowserRouter([
  // Client/Candidate Routes
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/description/:id',
    element: <JobDescription />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <Profile />
  },

  // Recruiter/Admin Routes (All Protected)
  {
    path: '/admin/profile',
    element: <ProtectedRoute><AdminProfile /></ProtectedRoute>
  },
  {
    path: '/admin/companies',
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: '/admin/companies/create',
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
  },
  {
    path: '/admin/companies/:id',
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
  },
  {
    path: '/admin/jobs',
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path: '/admin/jobs/create',
    element: <ProtectedRoute><PostJob /></ProtectedRoute>
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  },
])

function App() {
  return (
    <div className="min-h-screen bg-gray-50 selection:bg-purple-100 selection:text-purple-700">
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App




// import {createBrowserRouter, RouterProvider} from 'react-router-dom'

// import Navbar from "./components/shared/Navbar"
// import Login from './components/auth/Login';
// import Signup from './components/auth/Signup'
// import Home from './components/Home';
// import Jobs from './components/Jobs';
// import Browse from './components/Browse';
// import Profile from './components/Profile';
// import JobDescription from './components/JobDescription';
// import Companies from './admin/Companies';
// import CompanyCreate from './admin/CompanyCreate';
// import CompanySetup from './admin/CompanySetup';
// import AdminJobs from './admin/AdminJobs'
// import PostJob from './admin/PostJob';
// import Applicants from './admin/Applicants';
// import ProtectedRoute from './admin/ProtectedRoute';

// const appRouter=createBrowserRouter([
//   //client ke liyye
//   {
//     path:'/',
//     element:<Home/>
//   },
//   {
//     path:'/login',
//     element:<Login/>
//   },
//   {
//     path:'/signup',
//     element:<Signup/>
//   },
//   {
//     path:'/jobs',
//     element:<Jobs/>
//   },
//   {
//     path:'/description/:id',
//     element:<JobDescription/>
//   },
//   {
//     path:'/browse',
//     element:<Browse/>
//   },
//   {
//     path:'/profile',
//     element:<Profile/>
//   },

//   //admin ke liye yha se start hoga
//   {
//     path:'/admin/companies',
//     element:<Companies/>
//   },
//   {
//     path:'/admin/companies/create',
//     element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>
//   },
//   {
//     path:'/admin/companies/:id',
//     element:<CompanySetup/>
//   },
//   {
//     path:'/admin/jobs',
//     element:<AdminJobs/>
//   },
//   {
//     path:'/admin/jobs/create',
//     element:<PostJob/>
//   },

//   {
//     path:'/admin/jobs/:id/applicants',
//     element:<Applicants/>
//   },



  
// ])

// function App() {
//   return (
//     <>
//     <RouterProvider router={appRouter}/>
//     </>
//   )
// }

// export default App
