import { Routes, Route, Link, BrowserRouter, useNavigate } from 'react-router-dom'
import HomePage from './pages/public/HomePage';
import Footer from './components/Footer';
import Header from './components/Header';
import Register from './pages/public/Register';
import UserProfile from './pages/private/UserProfile';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminHeader from './components/AdminHeader';
import PrivateRoute from './components/PrivateRoute';
import PasswordForgotten from './pages/public/PasswordForgotten';
import NotFound from './pages/public/NotFound';
import MatchingPage from './pages/private/MatchingPage';
import AdminPrivateRoute from './components/AdminPrivateRoute';
import AdminPage from './pages/private/AdminPage';
import TermsAndServices from './pages/public/TermsAndServices';
import SpecialRoute from './components/SpecialRoute';

function App() {

  return (
    <BrowserRouter errorElement={<NotFound/>} >
    
      {/* <Header/> */}

      <AuthProvider>
        
        {/* <AdminHeader/> */}

        <Routes>

        <Route path='/' element={
          <SpecialRoute>
            <HomePage/>
          </SpecialRoute>
        } />
        <Route path='/inscription' element={<Register/>} />
        <Route path='/changement-mot-de-pass' element={<PasswordForgotten/>} />
        
        <Route path='/terms-of-service' element={<TermsAndServices/>} />


        <Route path='/profile' element={
          <PrivateRoute>
            <UserProfile/>
          </PrivateRoute>
        } />
        <Route path='/profile/:scannedMatchId' element={
          <PrivateRoute>
            <MatchingPage/>
          </PrivateRoute>
        } />
        
        <Route path='/admin/dashboard' element={
          <AdminPrivateRoute>
            <AdminPage/>
          </AdminPrivateRoute>
        } />


        <Route element={<NotFound/>} />

        </Routes>


        <Footer/>

      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;
