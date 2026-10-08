import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { InterviewProvider } from './context/InterviewContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { ResumePage } from './pages/ResumePage';
import { MockTestPage } from './pages/MockTestPage';
import { InterviewSetupPage } from './pages/InterviewSetupPage';
import { InterviewRoomPage } from './pages/InterviewRoomPage';
import { CodingInterviewPage } from './pages/CodingInterviewPage';
import { ResultPage } from './pages/ResultPage';
import { HistoryPage } from './pages/HistoryPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { LearningPlanPage } from './pages/LearningPlanPage';
import { CareerAiPage } from './pages/CareerAiPage';
import { CompanyTrackPage } from './pages/CompanyTrackPage';
import { AdminPage } from './pages/AdminPage';

export function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage setCurrentPage={setCurrentPage} />;
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} />;
      case 'register':
        return <RegisterPage setCurrentPage={setCurrentPage} />;
      case 'dashboard':
        return <DashboardPage setCurrentPage={setCurrentPage} />;
      case 'profile':
        return <ProfilePage setCurrentPage={setCurrentPage} />;
      case 'resume':
        return <ResumePage setCurrentPage={setCurrentPage} />;
      case 'mock-test':
        return <MockTestPage setCurrentPage={setCurrentPage} />;
      case 'setup':
        return <InterviewSetupPage setCurrentPage={setCurrentPage} />;
      case 'room':
        return <InterviewRoomPage setCurrentPage={setCurrentPage} />;
      case 'coding':
        return <CodingInterviewPage setCurrentPage={setCurrentPage} />;
      case 'result':
        return <ResultPage setCurrentPage={setCurrentPage} />;
      case 'history':
        return <HistoryPage setCurrentPage={setCurrentPage} />;
      case 'skills':
        return <SkillGapPage setCurrentPage={setCurrentPage} />;
      case 'learning-plan':
        return <LearningPlanPage setCurrentPage={setCurrentPage} />;
      case 'career-ai':
        return <CareerAiPage setCurrentPage={setCurrentPage} />;
      case 'companies':
        return <CompanyTrackPage setCurrentPage={setCurrentPage} />;
      case 'admin':
        return <AdminPage setCurrentPage={setCurrentPage} />;
      default:
        return <LandingPage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <InterviewProvider>
        <div className="min-h-screen bg-dark-900 text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white antialiased">
          {/* Top Sticky Navigation */}
          <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          
          {/* Main Content Area */}
          <main className="flex-1">
            {renderPage()}
          </main>

          {/* Footer (hidden inside interview room for focus) */}
          {currentPage !== 'room' && currentPage !== 'mock-test' && (
            <Footer setCurrentPage={setCurrentPage} />
          )}
        </div>
      </InterviewProvider>
    </AuthProvider>
  );
}

export default App;
