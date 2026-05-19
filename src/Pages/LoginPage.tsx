import React, { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            
          }),
        },
      );

      let data: any = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      console.log("Server response:", data);

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            `Login failed (${response.status})`,
        );
      }

      // Example token storage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      setSuccess(true);
    } catch (error: unknown) {
      console.error("Login failed:", error);

      if (
        error instanceof TypeError &&
        error.message === "Failed to fetch"
      ) {
        setError(
          "Unable to connect to the server. Please try again later.",
        );
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white flex items-center overflow-hidden font-sans">
      {/* ================= BACKGROUND GRAPHICS ================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-none hidden md:block">
        <div className="absolute top-0 right-[25%] w-[320px] h-[160px] bg-gradient-to-b from-purple-200 to-purple-300 rounded-b-full opacity-80" />

        <div className="absolute -top-12 right-[45%] w-[240px] h-[240px] bg-blue-50/60 rounded-full blur-sm" />

        <div className="absolute -top-16 right-[2%] w-[280px] h-[140px] bg-orange-200 rounded-b-full rotate-12" />

        <div className="absolute top-[10%] -right-16 w-[160px] h-[320px] bg-pink-200 rounded-l-full opacity-80" />

        <div className="absolute top-[25%] right-[12%] opacity-30 grid grid-cols-6 gap-2">
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              className="w-[3px] h-[3px] bg-slate-700 rounded-full"
            />
          ))}
        </div>

        <div className="absolute top-[40%] right-[36%] w-[80px] h-[40px] bg-rose-300 rounded-b-full -rotate-45" />

        <div className="absolute -bottom-10 right-[38%] w-[160px] h-[260px] bg-gradient-to-br from-rose-400 to-red-500 rounded-t-full rounded-bl-full rotate-12 drop-shadow-sm" />

        <div className="absolute bottom-[4%] right-[24%] w-[180px] h-[90px] bg-cyan-200 rounded-b-full -rotate-[35deg]" />

        <div className="absolute bottom-[18%] right-[4%] w-[150px] h-[130px] bg-purple-300 rounded-2xl rotate-12 opacity-90" />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-12 items-center z-10">
        {/* ================= LEFT COLUMN ================= */}
        <div className="md:col-span-5 flex flex-col justify-center w-full max-w-md mx-auto md:mx-0">
          {success ? (
            /* ================= SUCCESS STATE ================= */
            <div className="text-center py-8">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h2 className="text-xl font-semibold text-slate-800 mb-1">
                Login successful!
              </h2>

              <p className="text-sm text-slate-500">
                Welcome back.
              </p>

              <button
                className="inline-block mt-5 px-6 py-2.5 bg-[#635BFF] hover:bg-[#5346E0] text-white text-sm font-medium rounded-md transition-colors"
              >
                Continue
              </button>
            </div>
          ) : (
            <>
              {/* Google Login */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200/80 rounded-md bg-white hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700 shadow-xs"
              >
                <img
                  src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                  alt="Google"
                  className="w-5 h-5"
                />

                Sign in with Google
              </button>

              {/* Divider */}
              <div className="text-center my-4">
                <span className="text-xs text-slate-400 bg-white px-2">
                  Or sign in with email
                </span>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-2.5 px-4 py-3 mb-4 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
                  <svg
                    className="w-4 h-4 mt-0.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                    />
                  </svg>

                  <span>{error}</span>
                </div>
              )}

              {/* ================= FORM ================= */}
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Email */}
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    disabled={isLoading}
                    className="w-full px-4 py-3.5 bg-slate-100/70 border border-transparent rounded-md focus:outline-none focus:bg-white focus:border-purple-400 text-slate-800 placeholder-slate-400 text-sm transition-all disabled:opacity-50"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    disabled={isLoading}
                    className="w-full px-4 py-3.5 bg-slate-100/70 border border-transparent rounded-md focus:outline-none focus:bg-white focus:border-purple-400 text-slate-800 placeholder-slate-400 text-sm transition-all pr-10 disabled:opacity-50"
                  />

                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <label className="flex items-center space-x-2 cursor-pointer text-slate-500">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) =>
                        setRememberMe(
                          e.target.checked,
                        )
                      }
                      disabled={isLoading}
                      className="w-4 h-4 rounded text-purple-600 focus:ring-purple-400 border-slate-300 accent-purple-600"
                    />

                    <span>Keep me logged in</span>
                  </label>

                  <a
                    href="#forgot"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-[#635BFF] hover:bg-[#5346E0] disabled:bg-[#9d99f5] text-white font-medium rounded-md shadow-xs transition-colors text-sm mt-2 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />

                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>

                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="text-center text-sm text-slate-500 mt-6">
                Don't have an account?{" "}
                <a
                  href="#signup"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Sign up
                </a>
              </div>
            </>
          )}
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="hidden md:flex md:col-span-7 flex-col justify-center pl-16 lg:pl-24 select-none">
          <h1 className="text-[44px] lg:text-[52px] font-bold tracking-tight text-slate-800 leading-[1.15] max-w-md">
            Changing the way <br />
            the world styles
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;