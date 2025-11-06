import { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { StudentDashboard } from './components/StudentDashboard';
import { ProfessorDashboard } from './components/ProfessorDashboard';
import { ProjectPage } from './components/ProjectPage';
import { ProfilePage } from './components/ProfilePage';
import { SignupPage } from './components/SignupPage';
import { HomeMobile } from './components/mobile/HomeMobile';
import { LoginMobile } from './components/mobile/LoginMobile';
import { StudentHomeMobile } from './components/mobile/StudentHomeMobile';
import { ProfessorHomeMobile } from './components/mobile/ProfessorHomeMobile';
import { ProjectDetailsMobile } from './components/mobile/ProjectDetailsMobile';
import { ApplyFormMobile } from './components/mobile/ApplyFormMobile';
import { CandidateManagementMobile } from './components/mobile/CandidateManagementMobile';
import { SignupMobile } from './components/mobile/SignupMobile';
import { Toaster } from './components/ui/sonner';

type Page = 'home' | 'landing' | 'student' | 'professor' | 'project' | 'profile' | 'signup' | 'student-home' | 'professor-home' | 'project-details' | 'apply-form' | 'candidate-management';

type UserType = 'student' | 'professor' | null;

interface UserProfile {
  name: string;
  university: string;
  photo?: string;
  presentation?: string;
  academicHistory?: string;
  lattesUrl?: string;
  linkedinUrl?: string;
}

interface NavigationState {
  page: Page;
  projectId?: string;
  profileUserId?: string;
}

export default function App() {
  const [navigation, setNavigation] = useState<NavigationState>({ page: 'home' });
  const [userType, setUserType] = useState<UserType>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'João Silva',
    university: 'USP - Cardiologia',
    photo: '',
    presentation: '',
    academicHistory: '',
    lattesUrl: 'http://lattes.cnpq.br/1234567890',
    linkedinUrl: 'https://linkedin.com/in/joaosilva',
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigate = (page: Page, projectId?: string, profileUserId?: string) => {
    setNavigation({ page, projectId, profileUserId });
  };

  const handleLogin = (type: 'student' | 'professor') => {
    setUserType(type);
    if (isMobile) {
      navigate(type === 'student' ? 'student-home' : 'professor-home');
    } else {
      navigate(type === 'student' ? 'student' : 'professor');
    }
  };

  const handleLoginNavigation = (page: 'signup' | 'home') => {
    if (page === 'signup') {
      navigate('signup');
    } else {
      navigate('home');
    }
  };

  const handleHomeNavigation = (page: 'login' | 'signup' | 'home') => {
    if (page === 'login') {
      navigate('landing');
    } else if (page === 'signup') {
      navigate('signup');
    } else {
      navigate('home');
    }
  };

  const updateProfile = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  const renderPage = () => {
    // Mobile views
    if (isMobile) {
      switch (navigation.page) {
        case 'home':
          return <HomeMobile onNavigate={handleHomeNavigation} />;
        case 'landing':
          return <LoginMobile onLogin={handleLogin} onNavigate={handleLoginNavigation} />;
        case 'signup':
          return <SignupMobile onNavigate={(page) => {
            if (page === 'landing') {
              navigate('landing');
            } else if (page === 'student-home') {
              setUserType('student');
              navigate('student-home');
            } else if (page === 'professor-home') {
              setUserType('professor');
              navigate('professor-home');
            }
          }} />;
        case 'student-home':
          return <StudentHomeMobile onNavigate={navigate} userProfile={userProfile} />;
        case 'professor-home':
          return <ProfessorHomeMobile onNavigate={navigate} userProfile={userProfile} />;
        case 'project-details':
        case 'project':
          return <ProjectDetailsMobile onNavigate={navigate} userType={userType} projectId={navigation.projectId} />;
        case 'apply-form':
          return <ApplyFormMobile onNavigate={navigate} projectId={navigation.projectId} />;
        case 'candidate-management':
          return <CandidateManagementMobile onNavigate={navigate} projectId={navigation.projectId} />;
        default:
          return <HomeMobile onNavigate={handleHomeNavigation} />;
      }
    }

    // Desktop views
    switch (navigation.page) {
      case 'home':
        return <HomePage onNavigate={handleHomeNavigation} />;
      case 'landing':
        return <LoginPage onLogin={handleLogin} onNavigate={handleLoginNavigation} />;
      case 'signup':
        return <SignupPage onNavigate={(page) => {
          if (page === 'landing') {
            navigate('landing');
          } else if (page === 'student') {
            setUserType('student');
            navigate('student');
          } else if (page === 'professor') {
            setUserType('professor');
            navigate('professor');
          }
        }} />;
      case 'student':
        return <StudentDashboard onNavigate={navigate} userProfile={userProfile} onUpdateProfile={updateProfile} />;
      case 'professor':
        return <ProfessorDashboard onNavigate={navigate} userProfile={userProfile} onUpdateProfile={updateProfile} />;
      case 'project':
        return <ProjectPage onNavigate={navigate} projectId={navigation.projectId} userType={userType} />;
      case 'profile':
        return <ProfilePage onNavigate={navigate} userId={navigation.profileUserId} />;
      default:
        return <HomePage onNavigate={handleHomeNavigation} />;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">{renderPage()}</div>
      <Toaster />
    </>
  );
}