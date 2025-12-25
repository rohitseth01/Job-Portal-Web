import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategorySection from './CategorySection'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import TopCompanies from './TopCompanies' 
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '../redux/jobSlice' // FIXED: Capital 'S'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchedQuery("")); // FIXED: Capital 'S'
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