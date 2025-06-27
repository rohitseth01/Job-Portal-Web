import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategorySection from './CategorySection'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import TopCompanies from './TopCompanies' // Import the new file
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setsearchedQuery } from '../redux/jobSlice'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setsearchedQuery("")); 
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [user, navigate, dispatch]);

  return (
    <div className="bg-white flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <TopCompanies /> 
        {/* Only apply spacing to the bottom content */}
        <div className="mt-16 space-y-20 pb-20">
            <CategorySection />
            <LatestJobs />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home