import {Outlet, Navigate} from 'react-router-dom';

const AuthLayout = () => {
  const isAuthenticated = false;
  
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <div className="min-h-screen w-full flex">
          {/* Mobile & Desktop Form Container */}
          <div className="flex-1 flex items-center justify-center bg-dark-1 px-4 py-8 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <Outlet />
            </div>
          </div>
          
          {/* Desktop Side Image - Hidden on mobile */}
          <div className="hidden lg:flex lg:flex-1 lg:max-w-lg xl:max-w-xl bg-gradient-to-br from-primary-500 to-primary-800 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
              {/* Decorative shapes */}
              <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
              <div className="absolute top-32 right-16 w-16 h-16 bg-white/5 rounded-full"></div>
              <div className="absolute bottom-20 left-8 w-24 h-24 bg-white/10 rounded-full"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-center text-white p-8 lg:p-12">
              <div className="text-center max-w-sm">
                <img 
                  src="/assets/images/logo t5.png"
                  alt="Career Quest"
                  className="w-20 h-20 mx-auto mb-6"
                />
                <h2 className="text-3xl font-bold mb-4">
                  Welcome to <span className="text-yellow-300">Career Quest</span>
                </h2>
                <p className="text-lg opacity-90 mb-6">
                  Connect with professionals and build your career network.
                </p>
                
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
                    <span className="text-sm opacity-80">Share opportunities</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
                    <span className="text-sm opacity-80">Connect professionals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
                    <span className="text-sm opacity-80">Build your network</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthLayout;
