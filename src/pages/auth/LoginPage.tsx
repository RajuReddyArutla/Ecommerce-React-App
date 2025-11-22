// import { useState, useEffect } from 'react';
// // import { Link, useNavigate, useSearchParams } from 'react-router-dom';
// // import { LogIn, Package, Eye, EyeOff } from 'lucide-react';
// // import { useAuthStore } from '@/store/authStore';
// // import toast from 'react-hot-toast';
// // import { ROUTES } from '@/utils/constants';

// // export default function LoginPage() {
// //   const navigate = useNavigate();
// //   const [searchParams] = useSearchParams();
// //   const { login, googleLogin, isLoading } = useAuthStore();
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [formData, setFormData] = useState({
// //     email: '',
// //     password: '',
// //   });

// //   const enableGoogleAuth = import.meta.env.VITE_ENABLE_GOOGLE_AUTH === 'true';
// //   const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// //   // ✅ Initialize Google Sign-In on component mount
// //   useEffect(() => {
// //     if (enableGoogleAuth && googleClientId && window.google) {
// //       window.google.accounts.id.initialize({
// //         client_id: googleClientId,
// //         callback: handleGoogleResponse,
// //       });

// //       // Render the Google Sign-In button
// //       window.google.accounts.id.renderButton(
// //         document.getElementById('googleSignInButton'),
// //         {
// //           theme: 'outline',
// //           size: 'large',
// //           width: '100%',
// //           text: 'signin_with',
// //           shape: 'rectangular',
// //         }
// //       );
// //     }
// //   }, [enableGoogleAuth, googleClientId]);

// //   // ✅ Handle Google Sign-In Response (ID Token)
// //   const handleGoogleResponse = async (response: any) => {
// //     try {
// //       const result = await googleLogin(response.credential);
      
// //       if (result.success) {
// //         toast.success('Google login successful!');
// //         const redirect = searchParams.get('redirect');
// //         const defaultRoute = result.user?.role === 'admin' 
// //           ? ROUTES.ADMIN_DASHBOARD 
// //           : ROUTES.CUSTOMER_PRODUCTS;
        
// //         navigate(redirect || defaultRoute, { replace: true });
// //       }
// //     } catch (error: any) {
// //       console.error('Google login error:', error);
// //       toast.error(error.response?.data?.message || 'Google login failed');
// //     }
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
    
// //     try {
// //       const result = await login(formData);
      
// //       if (result.success) {
// //         toast.success('Login successful!');
// //         const redirect = searchParams.get('redirect');
// //         const defaultRoute = result.user?.role === 'admin' 
// //           ? ROUTES.ADMIN_DASHBOARD 
// //           : ROUTES.CUSTOMER_PRODUCTS;
        
// //         navigate(redirect || defaultRoute, { replace: true });
// //       }
// //     } catch (error: any) {
// //       toast.error(error.response?.data?.message || 'Login failed');
// //     }
// //   };

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       [e.target.name]: e.target.value,
// //     }));
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
// //       <div className="max-w-md w-full space-y-8">
// //         {/* Logo & Title */}
// //         <div className="text-center">
// //           <div className="flex items-center justify-center mb-6">
// //             <div className="bg-primary-600 p-4 rounded-2xl shadow-lg">
// //               <Package className="w-12 h-12 text-white" />
// //             </div>
// //           </div>
// //           <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
// //           <p className="text-gray-600">Sign in to your account to continue</p>
// //         </div>

// //         {/* Login Form */}
// //         <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
// //           <form onSubmit={handleSubmit} className="space-y-6">
// //             {/* Email */}
// //             <div>
// //               <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
// //                 Email Address
// //               </label>
// //               <input
// //                 id="email"
// //                 name="email"
// //                 type="email"
// //                 required
// //                 value={formData.email}
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
// //                 placeholder="you@example.com"
// //               />
// //             </div>

// //             {/* Password */}
// //             <div>
// //               <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
// //                 Password
// //               </label>
// //               <div className="relative">
// //                 <input
// //                   id="password"
// //                   name="password"
// //                   type={showPassword ? 'text' : 'password'}
// //                   required
// //                   value={formData.password}
// //                   onChange={handleChange}
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-12 transition-all"
// //                   placeholder="Enter your password"
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowPassword(!showPassword)}
// //                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
// //                 >
// //                   {showPassword ? (
// //                     <EyeOff className="w-5 h-5" />
// //                   ) : (
// //                     <Eye className="w-5 h-5" />
// //                   )}
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Remember Me & Forgot Password */}
// //             <div className="flex items-center justify-between">
// //               <div className="flex items-center">
// //                 <input
// //                   id="remember"
// //                   name="remember"
// //                   type="checkbox"
// //                   className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
// //                 />
// //                 <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 cursor-pointer">
// //                   Remember me
// //                 </label>
// //               </div>
// //               <button type="button" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
// //                 Forgot password?
// //               </button>
// //             </div>

// //             {/* Submit Button */}
// //             <button
// //               type="submit"
// //               disabled={isLoading}
// //               className="w-full flex items-center justify-center px-4 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg hover:shadow-xl"
// //             >
// //               {isLoading ? (
// //                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
// //               ) : (
// //                 <>
// //                   <LogIn className="w-5 h-5 mr-2" />
// //                   Sign In
// //                 </>
// //               )}
// //             </button>

// //             {/* ✅ UPDATED: Google Sign-In Button using ID Token */}
// //             {enableGoogleAuth && googleClientId && (
// //               <>
// //                 <div className="relative">
// //                   <div className="absolute inset-0 flex items-center">
// //                     <div className="w-full border-t border-gray-300"></div>
// //                   </div>
// //                   <div className="relative flex justify-center text-sm">
// //                     <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
// //                   </div>
// //                 </div>

// //                 {/* Google Sign-In Button Container */}
// //                 <div id="googleSignInButton" className="w-full flex justify-center"></div>
// //               </>
// //             )}

// //             {/* Demo Credentials */}
// //             <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
// //               <p className="text-sm font-semibold text-blue-800 mb-2">🔑 Demo Credentials:</p>
// //               <div className="text-xs text-blue-700 space-y-1 font-mono">
// //                 <p><strong>Admin:</strong> admin@example.com / admin123456</p>
// //                 <p><strong>Customer:</strong> customer@example.com / customer123</p>
// //               </div>
// //             </div>

// //             {/* Register Link */}
// //             <p className="text-center text-sm text-gray-600">
// //               Don't have an account?{' '}
// //               <Link
// //                 to={ROUTES.REGISTER}
// //                 className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
// //               >
// //                 Create an account
// //               </Link>
// //             </p>
// //           </form>
// //         </div>

// //         {/* Footer */}
// //         <p className="text-center text-xs text-gray-500">
// //           © 2024 ShopHub. All rights reserved.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // // ✅ Add TypeScript declaration for Google Sign-In
// // declare global {
// //   interface Window {
// //     google?: {
// //       accounts: {
// //         id: {
// //           initialize: (config: any) => void;
// //           renderButton: (element: HTMLElement | null, config: any) => void;
// //           prompt: () => void;
// //         };
// //       };
// //     };
// //   }
// // }

// import { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate, useSearchParams } from 'react-router-dom';
// import { LogIn, Package, Eye, EyeOff } from 'lucide-react';
// import { useAuthStore } from '@/store/authStore';
// import toast from 'react-hot-toast';
// import { ROUTES } from '@/utils/constants';

// export default function LoginPage() {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const { login, googleLogin, isLoading, user } = useAuthStore();
//   const [showPassword, setShowPassword] = useState(false);
//   const [googleLoaded, setGoogleLoaded] = useState(false);
//   const googleButtonRef = useRef<HTMLDivElement>(null);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const enableGoogleAuth = import.meta.env.VITE_ENABLE_GOOGLE_AUTH === 'true';
//   const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

//   // ✅ Redirect if already logged in
//   useEffect(() => {
//     if (user) {
//       const defaultRoute = user.role === 'admin' 
//         ? ROUTES.ADMIN_DASHBOARD 
//         : ROUTES.CUSTOMER_PRODUCTS;
//       navigate(defaultRoute, { replace: true });
//     }
//   }, [user, navigate]);

//   // ✅ Load Google Sign-In Script
//   useEffect(() => {
//     if (!enableGoogleAuth || !googleClientId) return;

//     const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
    
//     if (existingScript) {
//       if (window.google) {
//         setGoogleLoaded(true);
//       }
//       return;
//     }

//     const script = document.createElement('script');
//     script.src = 'https://accounts.google.com/gsi/client';
//     script.async = true;
//     script.defer = true;
    
//     script.onload = () => {
//       setGoogleLoaded(true);
//     };

//     script.onerror = () => {
//       console.error('Failed to load Google Sign-In script');
//       toast.error('Failed to load Google Sign-In');
//     };

//     document.body.appendChild(script);
//   }, [enableGoogleAuth, googleClientId]);

//   // ✅ Initialize Google Sign-In when script is loaded
//   useEffect(() => {
//     if (!googleLoaded || !window.google || !googleButtonRef.current) return;

//     try {
//       window.google.accounts.id.initialize({
//         client_id: googleClientId,
//         callback: handleGoogleResponse,
//         auto_select: false,
//         cancel_on_tap_outside: true,
//       });

//       window.google.accounts.id.renderButton(
//         googleButtonRef.current,
//         {
//           theme: 'outline',
//           size: 'large',
//           width: 350,
//           text: 'signin_with',
//           shape: 'rectangular',
//           logo_alignment: 'left',
//         }
//       );

//       console.log('✅ Google Sign-In button rendered successfully');
//     } catch (error) {
//       console.error('Error initializing Google Sign-In:', error);
//       toast.error('Failed to initialize Google Sign-In');
//     }
//   }, [googleLoaded, googleClientId]);

//   // ✅ Handle Google Sign-In Response (ID Token)
//   const handleGoogleResponse = async (response: any) => {
//     try {
//       console.log('Google Sign-In response received');
      
//       if (!response.credential) {
//         throw new Error('No credential received from Google');
//       }

//       const result = await googleLogin(response.credential);
      
//       if (result.success) {
//         toast.success('Welcome back! Logging you in...');
        
//         // Wait a bit for state to update
//         setTimeout(() => {
//           const redirect = searchParams.get('redirect');
//           const defaultRoute = result.user?.role === 'admin' 
//             ? ROUTES.ADMIN_DASHBOARD 
//             : ROUTES.CUSTOMER_PRODUCTS;
          
//           navigate(redirect || defaultRoute, { replace: true });
//         }, 500);
//       }
//     } catch (error: any) {
//       console.error('Google login error:', error);
//       toast.error(error.response?.data?.message || error.message || 'Google login failed');
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!formData.email || !formData.password) {
//       toast.error('Please fill in all fields');
//       return;
//     }
    
//     try {
//       const result = await login(formData);
      
//       if (result.success) {
//         toast.success('Welcome back! Logging you in...');
        
//         // Wait a bit for state to update
//         setTimeout(() => {
//           const redirect = searchParams.get('redirect');
//           const defaultRoute = result.user?.role === 'admin' 
//             ? ROUTES.ADMIN_DASHBOARD 
//             : ROUTES.CUSTOMER_PRODUCTS;
          
//           navigate(redirect || defaultRoute, { replace: true });
//         }, 500);
//       }
//     } catch (error: any) {
//       console.error('Login error:', error);
//       toast.error(error.response?.data?.message || 'Login failed');
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         {/* Logo & Title */}
//         <div className="text-center">
//           <div className="flex items-center justify-center mb-6">
//             <div className="bg-primary-600 p-4 rounded-2xl shadow-lg">
//               <Package className="w-12 h-12 text-white" />
//             </div>
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
//           <p className="text-gray-600">Sign in to your account to continue</p>
//         </div>

//         {/* Login Form */}
//         <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
//                 placeholder="you@example.com"
//                 autoComplete="email"
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-12 transition-all"
//                   placeholder="Enter your password"
//                   autoComplete="current-password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   aria-label={showPassword ? 'Hide password' : 'Show password'}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Remember Me & Forgot Password */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember"
//                   name="remember"
//                   type="checkbox"
//                   className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
//                 />
//                 <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 cursor-pointer">
//                   Remember me
//                 </label>
//               </div>
//               <button 
//                 type="button" 
//                 className="text-sm text-primary-600 hover:text-primary-700 font-medium"
//                 onClick={() => toast.info('Password reset feature coming soon!')}
//               >
//                 Forgot password?
//               </button>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full flex items-center justify-center px-4 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg hover:shadow-xl"
//             >
//               {isLoading ? (
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               ) : (
//                 <>
//                   <LogIn className="w-5 h-5 mr-2" />
//                   Sign In
//                 </>
//               )}
//             </button>

//             {/* ✅ Google Sign-In Button */}
//             {enableGoogleAuth && googleClientId && (
//               <>
//                 <div className="relative">
//                   <div className="absolute inset-0 flex items-center">
//                     <div className="w-full border-t border-gray-300"></div>
//                   </div>
//                   <div className="relative flex justify-center text-sm">
//                     <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
//                   </div>
//                 </div>

//                 {/* Google Sign-In Button Container */}
//                 <div className="w-full flex justify-center">
//                   <div ref={googleButtonRef} className="w-full max-w-sm flex justify-center"></div>
//                 </div>

//                 {/* Loading indicator while Google script loads */}
//                 {!googleLoaded && (
//                   <div className="flex justify-center items-center py-4">
//                     <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
//                     <span className="ml-2 text-sm text-gray-500">Loading Google Sign-In...</span>
//                   </div>
//                 )}
//               </>
//             )}

//             {/* Demo Credentials */}
//             <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
//               <p className="text-sm font-semibold text-blue-800 mb-2">🔑 Demo Credentials:</p>
//               <div className="text-xs text-blue-700 space-y-1 font-mono">
//                 <p><strong>Admin:</strong> admin@example.com / admin123456</p>
//                 <p><strong>Customer:</strong> customer@example.com / customer123</p>
//               </div>
//             </div>

//             {/* Register Link */}
//             <p className="text-center text-sm text-gray-600">
//               Don't have an account?{' '}
//               <Link
//                 to={ROUTES.REGISTER}
//                 className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
//               >
//                 Create an account
//               </Link>
//             </p>
//           </form>
//         </div>

//         {/* Footer */}
//         <p className="text-center text-xs text-gray-500">
//           © 2024 ShopHub. All rights reserved.
//         </p>
//       </div>
//     </div>
//   );
// }

// // ✅ TypeScript declaration for Google Sign-In
// declare global {
//   interface Window {
//     google?: {
//       accounts: {
//         id: {
//           initialize: (config: {
//             client_id: string;
//             callback: (response: any) => void;
//             auto_select?: boolean;
//             cancel_on_tap_outside?: boolean;
//           }) => void;
//           renderButton: (
//             element: HTMLElement | null, 
//             config: {
//               theme?: 'outline' | 'filled_blue' | 'filled_black';
//               size?: 'large' | 'medium' | 'small';
//               width?: number;
//               text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
//               shape?: 'rectangular' | 'pill' | 'circle' | 'square';
//               logo_alignment?: 'left' | 'center';
//             }
//           ) => void;
//           prompt: () => void;
//         };
//       };
//     };
//   }
// }


import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { LogIn, Package, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { ROUTES } from '@/utils/constants';

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, googleLogin, isLoading, user } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const enableGoogleAuth = import.meta.env.VITE_ENABLE_GOOGLE_AUTH === 'true';
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (user) {
      const defaultRoute = user.role === 'admin' 
        ? ROUTES.ADMIN_DASHBOARD 
        : ROUTES.CUSTOMER_PRODUCTS;
      navigate(defaultRoute, { replace: true });
    }
  }, [user, navigate]);

  // ✅ Load Google Sign-In Script
  useEffect(() => {
    if (!enableGoogleAuth || !googleClientId) return;

    const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
    
    if (existingScript) {
      if (window.google) {
        setGoogleLoaded(true);
      }
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setGoogleLoaded(true);
    };

    script.onerror = () => {
      console.error('Failed to load Google Sign-In script');
      toast.error('Failed to load Google Sign-In');
    };

    document.body.appendChild(script);
  }, [enableGoogleAuth, googleClientId]);

  // ✅ Initialize Google Sign-In when script is loaded
  useEffect(() => {
    if (!googleLoaded || !window.google || !googleButtonRef.current) return;

    try {
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleGoogleResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        {
          theme: 'outline',
          size: 'large',
          width: 350,
          text: 'signin_with',
          shape: 'rectangular',
          logo_alignment: 'left',
        }
      );

      console.log('✅ Google Sign-In button rendered successfully');
    } catch (error) {
      console.error('Error initializing Google Sign-In:', error);
      toast.error('Failed to initialize Google Sign-In');
    }
  }, [googleLoaded, googleClientId]);

  // ✅ Handle Google Sign-In Response (ID Token)
  const handleGoogleResponse = async (response: any) => {
    try {
      console.log('Google Sign-In response received');
      
      if (!response.credential) {
        throw new Error('No credential received from Google');
      }

      const result = await googleLogin(response.credential);
      
      if (result.success) {
        toast.success('Welcome back! Logging you in...');
        
        // Wait a bit for state to update
        setTimeout(() => {
          const redirect = searchParams.get('redirect');
          const defaultRoute = result.user?.role === 'admin' 
            ? ROUTES.ADMIN_DASHBOARD 
            : ROUTES.CUSTOMER_PRODUCTS;
          
          navigate(redirect || defaultRoute, { replace: true });
        }, 500);
      }
    } catch (error: any) {
      console.error('Google login error:', error);
      toast.error(error.response?.data?.message || error.message || 'Google login failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    try {
      const result = await login(formData);
      
      if (result.success) {
        toast.success('Welcome back! Logging you in...');
        
        // Wait a bit for state to update
        setTimeout(() => {
          const redirect = searchParams.get('redirect');
          const defaultRoute = result.user?.role === 'admin' 
            ? ROUTES.ADMIN_DASHBOARD 
            : ROUTES.CUSTOMER_PRODUCTS;
          
          navigate(redirect || defaultRoute, { replace: true });
        }, 500);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo & Title */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary-600 p-4 rounded-2xl shadow-lg">
              <Package className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-12 transition-all"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                  Remember me
                </label>
              </div>
              <button 
                type="button" 
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                // FIXED: Changed toast.info to toast
                onClick={() => toast('Password reset feature coming soon!')}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </>
              )}
            </button>

            {/* ✅ Google Sign-In Button */}
            {enableGoogleAuth && googleClientId && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                  </div>
                </div>

                {/* Google Sign-In Button Container */}
                <div className="w-full flex justify-center">
                  <div ref={googleButtonRef} className="w-full max-w-sm flex justify-center"></div>
                </div>

                {/* Loading indicator while Google script loads */}
                {!googleLoaded && (
                  <div className="flex justify-center items-center py-4">
                    <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="ml-2 text-sm text-gray-500">Loading Google Sign-In...</span>
                  </div>
                )}
              </>
            )}

            {/* Demo Credentials */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
              <p className="text-sm font-semibold text-blue-800 mb-2">🔑 Demo Credentials:</p>
              <div className="text-xs text-blue-700 space-y-1 font-mono">
                <p><strong>Admin:</strong> admin@example.com / admin123456</p>
                <p><strong>Customer:</strong> customer@example.com / customer123</p>
              </div>
            </div>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to={ROUTES.REGISTER}
                className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500">
          © 2024 ShopHub. All rights reserved.
        </p>
      </div>
    </div>
  );
}

// ✅ TypeScript declaration for Google Sign-In
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: any) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          renderButton: (
            element: HTMLElement | null, 
            config: {
              theme?: 'outline' | 'filled_blue' | 'filled_black';
              size?: 'large' | 'medium' | 'small';
              width?: number;
              text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
              shape?: 'rectangular' | 'pill' | 'circle' | 'square';
              logo_alignment?: 'left' | 'center';
            }
          ) => void;
          prompt: () => void;
        };
      };
    };
  }
}