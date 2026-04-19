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

// Helper: check disclaimer only when we have a real user ID
const checkDisclaimer = (userId: string) => {
  if (!userId) return false;
  return localStorage.getItem(`disclaimerAgreed_${userId}`) === "true";
};

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated, isPending, user } = useUserContext();

  if (isPending) return null; // wait silently — App-level loader handles this

  if (!isAuthenticated) return <Navigate to="/sign-in" replace />;

  // User is authenticated — now check disclaimer with confirmed user.id
  if (!checkDisclaimer(user.id)) return <Navigate to="/disclaimer" replace />;

  return element;
};

const App = () => {
  const { isPending } = useUserContext();

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
        {/* Disclaimer route */}
        <Route path="/disclaimer" element={<Disclaimer />} />

        {/* Public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* Private routes */}
        <Route element={<RootLayout />}>
          <Route path="/"                    element={<ProtectedRoute element={<Home />} />} />
          <Route path="/explore"             element={<ProtectedRoute element={<Explore />} />} />
          <Route path="/saved"               element={<ProtectedRoute element={<Saved />} />} />
          <Route path="/saved-posts"         element={<ProtectedRoute element={<SavedPosts />} />} />
          <Route path="/all-users"           element={<ProtectedRoute element={<AllUsers />} />} />
          <Route path="/create-post"         element={<ProtectedRoute element={<CreatePost />} />} />
          <Route path="/update-post/:id"     element={<ProtectedRoute element={<EditPost />} />} />
          <Route path="/posts/:id"           element={<ProtectedRoute element={<PostDetails />} />} />
          <Route path="/profile/:id/*"       element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/profile/:id/saved"   element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/update-profile/:id"  element={<ProtectedRoute element={<UpdateProfile />} />} />
          <Route path="/placement-dashboard" element={<ProtectedRoute element={<PlacementDashboard />} />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
