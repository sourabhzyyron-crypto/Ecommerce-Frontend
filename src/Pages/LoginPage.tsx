import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="relative min-h-screen w-full bg-white flex items-center overflow-hidden font-sans">
      
      {/* ================= BACKGROUND GRAPHICS (RIGHT SIDE) ================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-none hidden md:block">
        
        {/* Top-Right Large Half-Circle (Purple) */}
        <div className="absolute top-0 right-[25%] w-[320px] h-[160px] bg-gradient-to-b from-purple-200 to-purple-300 rounded-b-full opacity-80" />
        
        {/* Top-Right Soft Blue Circle */}
        <div className="absolute -top-12 right-[45%] w-[240px] h-[240px] bg-blue-50/60 rounded-full blur-xs" />

        {/* Top-Right Salmon Orange Half-Circle */}
        <div className="absolute -top-16 right-[2%] w-[280px] h-[140px] bg-orange-200 rounded-b-full transform rotate-12" />

        {/* Far Right Pink Semi-Circle */}
        <div className="absolute top-[10%] -right-16 w-[160px] h-[320px] bg-pink-200 rounded-l-full opacity-80" />

        {/* Dot Grid Layer */}
        <div className="absolute top-[25%] right-[12%] opacity-30 grid grid-cols-6 gap-2">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="w-[3px] h-[3px] bg-slate-700 rounded-full" />
          ))}
        </div>

        {/* Middle Left Small Pink Slice near text */}
        <div className="absolute top-[40%] right-[36%] w-[80px] h-[40px] bg-salmon-coral bg-rose-300 rounded-b-full transform -rotate-45" />

        {/* Bottom Red/Orange Rounded Wedge */}
        <div className="absolute -bottom-10 right-[38%] w-[160px] h-[260px] bg-gradient-to-br from-rose-400 to-red-500 rounded-t-full rounded-bl-full transform rotate-12 filter drop-shadow-sm" />

        {/* Bottom Cyan Half-Circle */}
        <div className="absolute bottom-[4%] right-[24%] w-[180px] h-[90px] bg-cyan-200 rounded-b-full transform -rotate-[35deg]" />

        {/* Bottom Right Light Purple Triangle/Shield shape */}
        <div className="absolute bottom-[18%] right-[4%] w-[150px] h-[130px] bg-purple-300 rounded-2xl transform rotate-12 opacity-90" />
      </div>


      {/* ================= CONTENT CONTAINER ================= */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-12 items-center z-10">
        
        {/* LEFT COLUMN: LOGIN FORM */}
        <div className="md:col-span-5 flex flex-col justify-center w-full max-w-md mx-auto md:mx-0">
          


          {/* Google Sign In */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200/80 rounded-md bg-white hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700 shadow-xs"
          >
            <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="Google" className="w-5 h-5" />
            Sign in with Google
          </button>

          {/* Optional Sub-divider */}
          <div className="text-center my-4">
            <span className="text-xs text-slate-400 bg-white px-2">Or sign in with email</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-100/70 border border-transparent rounded-md focus:outline-none focus:bg-white focus:border-purple-400 text-slate-800 placeholder-slate-400 text-sm transition-all"
              />
            </div>

            <div className="relative">
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-100/70 border border-transparent rounded-md focus:outline-none focus:bg-white focus:border-purple-400 text-slate-800 placeholder-slate-400 text-sm transition-all pr-10"
              />
              {/* Password visibility toggle placeholder icon */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>

            {/* Remember & Forgot Row */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label className="flex items-center space-x-2 cursor-pointer text-slate-500">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-400 border-slate-300 accent-purple-600"
                />
                <span>Keep me logged in</span>
              </label>
              <a href="#forgot" className="font-medium text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Login Button (Matches the flat bright purple shade exactly) */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#635BFF] hover:bg-[#5346E0] text-white font-medium rounded-md shadow-xs transition-colors text-sm mt-2"
            >
              Login
            </button>
          </form>

          {/* Footer redirection link */}
          <div className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{' '}
            <a href="#signup" className="font-medium text-blue-600 hover:underline">
              Sign up
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: HERO TYPOGRAPHY */}
        <div className="hidden md:flex md:col-span-7 flex-col justify-center pl-16 lg:pl-24 select-none">
          <h1 className="text-[44px] lg:text-[52px] font-bold tracking-tight text-slate-800 leading-[1.15] max-w-md">
            Changing the way <br />
            the world Styles
          </h1>
        </div>

      </div>
    </div>
  );
};

export default Login;