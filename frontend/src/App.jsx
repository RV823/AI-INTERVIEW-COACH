import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import MockInterview from './pages/MockInterview';
import InterviewReport from './pages/InterviewReport';
import CodingInterview from './pages/CodingInterview';
import HRInterview from './pages/HRInterview';
import CareerAdvisor from './pages/CareerAdvisor';
import Gamification from './pages/Gamification';
import CompanyPrep from './pages/CompanyPrep';
import Login from './pages/Login';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#0b0f19] text-gray-100 selection:bg-indigo-500 selection:text-white">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/resume" element={<ResumeAnalyzer />} />
              <Route path="/interview" element={<MockInterview />} />
              <Route path="/interview-report" element={<InterviewReport />} />
              <Route path="/coding" element={<CodingInterview />} />
              <Route path="/hr-interview" element={<HRInterview />} />
              <Route path="/career" element={<CareerAdvisor />} />
              <Route path="/gamification" element={<Gamification />} />
              <Route path="/company-prep" element={<CompanyPrep />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
