import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./components/shared/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Layout from "./components/Layout";
import Companies from "./admin/Companies";
import CompanyCreate from "./admin/CompanyCreate";
import CompanySetup from "./admin/CompanySetup";
import AdminJobs from "./admin/AdminJobs";
import PostJob from "./admin/PostJob";
import Applicants from "./admin/Applicants";
import AdminProfile from "./admin/AdminProfile"; // Imported new admin profile component
import ProtectedRoute from "./admin/ProtectedRoute";
import PrivacyPolicy from './components/PrivacyPolicy';
import ContactUs from './components/ContactUs';

const appRouter = createBrowserRouter([
  // Client/Candidate Routes
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/signup",
    element: (
      <Layout>
        <Signup />
      </Layout>
    ),
  },
  {
    path: "/jobs",
    element: (
      <Layout>
        <Jobs />
      </Layout>
    ),
  },
  {
    path: "/description/:id",
    element: (
      <Layout>
        <JobDescription />
      </Layout>
    ),
  },
  {
    path: "/browse",
    element: (
      <Layout>
        <Browse />
      </Layout>
    ),
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },

  // Recruiter/Admin Routes (All Protected)
  {
    path: "/admin/profile",
    element: (
      <ProtectedRoute>
        <AdminProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy />
  },
  {
    path: "/contact",
    element: <ContactUs />
  }

]);

function App() {
  return (
    <div className="min-h-screen bg-gray-50 selection:bg-purple-100 selection:text-purple-700">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;


