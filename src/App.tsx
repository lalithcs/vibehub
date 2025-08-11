import AuthLayout from './_auth/AuthLayout';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import RootLayout from './_root/RootLayout';

import { Toaster } from "@/components/ui/toaster";
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile, Disclaimer } from './_root/pages';
import './globals.css'
import {Routes, Route, Navigate} from 'react-router-dom';
import PlacementDashboard from './_root/pages/PlacementDashboard';

const App = () => {
  // Check if user has already agreed to disclaimer
  const hasAgreedToDisclaimer = localStorage.getItem("disclaimerAgreed") === "true";

  return (
    <main className="flex h-screen">
        <Routes>
            {/* Disclaimer route - first page */}
            <Route path="/disclaimer" element={<Disclaimer />} />
            
            {/* public routes */}
            <Route element={<AuthLayout />} >
                <Route path="/sign-in" element={<SigninForm />} />
                <Route path="/sign-up" element={<SignupForm />} />
            </Route>

            {/* private routes */}
            <Route element={<RootLayout />} >
                <Route 
                  path="/" 
                  element={hasAgreedToDisclaimer ? <Home /> : <Navigate to="/disclaimer" replace />} 
                />
                <Route 
                  path="/explore" 
                  element={hasAgreedToDisclaimer ? <Explore /> : <Navigate to="/disclaimer" replace />} 
                />
                <Route 
                  path="/saved" 
                  element={hasAgreedToDisclaimer ? <Saved /> : <Navigate to="/disclaimer" replace />} 
                />
                <Route 
                  path="/all-users" 
                  element={hasAgreedToDisclaimer ? <AllUsers /> : <Navigate to="/disclaimer" replace />} 
                />
                <Route 
                  path="/create-post" 
                  element={hasAgreedToDisclaimer ? <CreatePost /> : <Navigate to="/disclaimer" replace />} 
                />
                <Route 
                  path="/update-post/:id" 
                  element={hasAgreedToDisclaimer ? <EditPost /> : <Navigate to="/disclaimer" replace />} 
                />
                <Route 
                  path="/posts/:id" 
                  element={hasAgreedToDisclaimer ? <PostDetails /> : <Navigate to="/disclaimer" replace />} 
                />
                <Route 
                  path="/profile/:id/*" 
                  element={hasAgreedToDisclaimer ? <Profile /> : <Navigate to="/disclaimer" replace />} 
                />
                <Route 
                  path="/update-profile/:id" 
                  element={hasAgreedToDisclaimer ? <UpdateProfile /> : <Navigate to="/disclaimer" replace />} 
                />
                <Route 
                  path="/placement-dashboard" 
                  element={hasAgreedToDisclaimer ? <PlacementDashboard /> : <Navigate to="/disclaimer" replace />} 
                />
            </Route>
        </Routes>

        <Toaster />
    </main>
  )
}

export default App
