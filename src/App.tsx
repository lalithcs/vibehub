import AuthLayout from './_auth/AuthLayout';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import RootLayout from './_root/RootLayout';

import { Toaster } from "@/components/ui/toaster";
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile, Disclaimer, SavedPosts } from './_root/pages';
import './globals.css'
import {Routes, Route, Navigate} from 'react-router-dom';
import PlacementDashboard from './_root/pages/PlacementDashboard';
import { useUserContext } from './context/AuthContext';

const App = () => {
  // Check if user has already agreed to disclaimer
  const hasAgreedToDisclaimer = localStorage.getItem("disclaimerAgreed") === "true";
  const { isAuthenticated, isPending } = useUserContext();

  // Show loading while checking authentication
  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-dark-1">
        <div className="text-light-1">Loading...</div>
      </div>
    );
  }

  return (
    <main className="flex h-screen">
        <Routes>
            {/* Disclaimer route - first page for new users */}
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
                  element={
                    isAuthenticated ? (
                      hasAgreedToDisclaimer ? <Home /> : <Navigate to="/disclaimer" replace />
                    ) : (
                      <Navigate to="/sign-in" replace />
                    )
                  } 
                />
                <Route 
                  path="/explore" 
                  element={
                    isAuthenticated ? (
                      hasAgreedToDisclaimer ? <Explore /> : <Navigate to="/disclaimer" replace />
                    ) : (
                      <Navigate to="/sign-in" replace />
                    )
                  } 
                />
                <Route 
                  path="/saved" 
                  element={
                    isAuthenticated ? (
                      hasAgreedToDisclaimer ? <Saved /> : <Navigate to="/disclaimer" replace />
                    ) : (
                      <Navigate to="/sign-in" replace />
                    )
                  } 
                />
                <Route 
                  path="/saved-posts" 
                  element={
                    isAuthenticated ? (
                      hasAgreedToDisclaimer ? <SavedPosts /> : <Navigate to="/disclaimer" replace />
                    ) : (
                      <Navigate to="/sign-in" replace />
                    )
                  } 
                />
                <Route 
                  path="/all-users" 
                  element={
                    isAuthenticated ? (
                      hasAgreedToDisclaimer ? <AllUsers /> : <Navigate to="/disclaimer" replace />
                    ) : (
                      <Navigate to="/sign-in" replace />
                    )
                  } 
                />
                <Route 
                  path="/create-post" 
                  element={
                    isAuthenticated ? (
                      hasAgreedToDisclaimer ? <CreatePost /> : <Navigate to="/disclaimer" replace />
                    ) : (
                      <Navigate to="/sign-in" replace />
                    )
                  } 
                />
                <Route 
                  path="/update-post/:id" 
                  element={
                    isAuthenticated ? (
                      hasAgreedToDisclaimer ? <EditPost /> : <Navigate to="/disclaimer" replace />
                    ) : (
                      <Navigate to="/sign-in" replace />
                    )
                  } 
                />
                <Route 
                  path="/posts/:id" 
                  element={
                    isAuthenticated ? (
                      hasAgreedToDisclaimer ? <PostDetails /> : <Navigate to="/disclaimer" replace />
                    ) : (
                      <Navigate to="/sign-in" replace />
                    )
                  } 
                />
                <Route 
                  path="/profile/:id/*" 
                  element={
                    isAuthenticated ? (
                      hasAgreedToDisclaimer ? <Profile /> : <Navigate to="/disclaimer" replace />
                    ) : (
                      <Navigate to="/sign-in" replace />
                    )
                  } 
                />
                <Route 
                  path="/profile/:id/saved" 
                  element={
                    isAuthenticated ? (
                      hasAgreedToDisclaimer ? <Profile /> : <Navigate to="/disclaimer" replace />
                    ) : (
                      <Navigate to="/sign-in" replace />
                    )
                  } 
                />
                <Route 
                  path="/update-profile/:id" 
                  element={
                    isAuthenticated ? (
                      hasAgreedToDisclaimer ? <UpdateProfile /> : <Navigate to="/disclaimer" replace />
                    ) : (
                      <Navigate to="/sign-in" replace />
                    )
                  } 
                />
                <Route 
                  path="/placement-dashboard" 
                  element={
                    isAuthenticated ? (
                      hasAgreedToDisclaimer ? <PlacementDashboard /> : <Navigate to="/disclaimer" replace />
                    ) : (
                      <Navigate to="/sign-in" replace />
                    )
                  } 
                />
            </Route>
        </Routes>

        <Toaster />
    </main>
  )
}

export default App
