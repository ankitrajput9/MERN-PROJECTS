import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Eye, EyeOff } from 'lucide-react';
import { axiosinstance } from '../services/axiosHandler';

gsap.registerPlugin(useGSAP);

const RegisterPage = ({ setFlag }) => {
  const containerRef = useRef(null);
  const brandRef = useRef(null);
  const cardRef = useRef(null);
  const formElementsRef = useRef([]);

  const [showPassword, setShowPassword] = useState(false);

// REGISTER DATA 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Registration Data:', data);
   let res = axiosinstance.post("/auth/register",data)
    .then((response) => { 
      console.log('Server Response:', response.data);
      if(response.data.success){
        setFlag(true)
      }   
  } )
    .catch((error) => {
      console.error('Registration Error:', error);
    })
  };







  // GSAP Animations

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power4.out' },
    });

    // Background Animation
    tl.fromTo(
      '.bg-image-layer',
      { opacity: 0, scale: 1.03 },
      { opacity: 1, scale: 1, duration: 1.8 }
    );

    // Logo Animation
    tl.fromTo(
      brandRef.current,
      { y: -80, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.4 },
      '-=1.2'
    );

    // Card Animation
    tl.fromTo(
      cardRef.current,
      { y: 60, opacity: 0, backdropFilter: 'blur(0px)' },
      {
        y: 0,
        opacity: 1,
        backdropFilter: 'blur(24px)',
        duration: 1.2,
      },
      '-=0.9'
    );

    // Form Elements Animation
    tl.fromTo(
      formElementsRef.current,
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
      },
      '-=0.6'
    );

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;

      const xPos = clientX / width - 0;
      const yPos = clientY / height - 0;

      // OPTIONAL PREMIUM EFFECTS

      // gsap.to(cardRef.current, {
      //   rotationY: xPos * 6,
      //   rotationX: -yPos * 6,
      //   x: xPos * 15,
      //   y: yPos * 15,
      //   duration: 0.6,
      //   ease: 'power2.out'
      // });

      // gsap.to('.bg-image-layer', {
      //   x: -xPos * 20,
      //   y: -yPos * 20,
      //   duration: 0.8,
      //   ease: 'power2.out'
      // });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, { scope: containerRef });

  const addToRefs = (el) => {
    if (el && !formElementsRef.current.includes(el)) {
      formElementsRef.current.push(el);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden bg-[#130b08] text-white font-sans perspective-1000 selection:bg-[#b0784c] selection:text-black"
    >
      {/* Background */}
      <div
        className="bg-image-layer absolute inset-0 w-full min-h-screen bg-cover bg-center z-0 will-change-transform"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(19, 11, 8, 0.25), rgba(48, 30, 24, 0.85)), url('/RGB-2.jpg')`,
        }}
      />

      {/* Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-1 flex justify-between items-center">
        <div className="text-2xl font-black tracking-tighter text-[#c68b59] transition-all duration-300 hover:tracking-widest">
          RedTape
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-grow w-full max-w-md px-4 my-6">

        {/* Brand */}
        <h1
          ref={brandRef}
          className="text-7xl md:text-8xl font-extrabold tracking-wider text-center select-none mb-1 opacity-0 uppercase"
          style={{
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            background:
              'linear-gradient(270deg, #6e4730, #b8835c, #ebd2b3, #6e4730)',
            backgroundSize: '400% 400%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradientMove 8s ease infinite',
          }}
        >
          RedTape
        </h1>

        {/* Keyframes */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes gradientMove {
                0% { background-position: 0% 50% }
                50% { background-position: 100% 50% }
                100% { background-position: 0% 50% }
              }

              .perspective-1000 {
                perspective: 1000px;
              }
            `,
          }}
        />

        <p className="text-xs text-stone-400 tracking-widest text-center max-w-xs mb-8 uppercase font-medium">
          Premium Performance Footwear
        </p>

        {/* Card */}
        <div
          ref={cardRef}
          className="w-full rounded-3xl p-8 opacity-0 border border-white/10 bg-white/[0.03] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl will-change-transform transform-style-3d"
        >
          <h2
            ref={addToRefs}
            className="text-xl font-medium text-center tracking-widest uppercase text-stone-200 mb-6"
          >
            Create Account
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >

            {/* Username */}
            <div
              ref={addToRefs}
              className="flex flex-col space-y-1.5"
            >
              <label className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
                Username
              </label>

              <input
                type="text"
                placeholder="johndoe"
                className={`w-full px-4 py-3 rounded-xl bg-black/20 border ${errors.username
                    ? 'border-red-500/50 focus:border-red-500'
                    : 'border-white/10 focus:border-[#b0784c]/60'
                  } focus:bg-black/40 text-white placeholder-stone-600 focus:outline-none transition-all duration-300 text-sm`}
                {...register('username', {
                  required: 'Username is required',
                  minLength: {
                    value: 3,
                    message:
                      'Username must be at least 3 characters',
                  },
                })}
              />

              {errors.username && (
                <span className="text-[11px] text-red-400 tracking-wide font-light">
                  {errors.username.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div
              ref={addToRefs}
              className="flex flex-col space-y-1.5"
            >
              <label className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
                Email Address
              </label>

              <input
                type="email"
                placeholder="name@example.com"
                className={`w-full px-4 py-3 rounded-xl bg-black/20 border ${errors.email
                    ? 'border-red-500/50 focus:border-red-500'
                    : 'border-white/10 focus:border-[#b0784c]/60'
                  } focus:bg-black/40 text-white placeholder-stone-600 focus:outline-none transition-all duration-300 text-sm`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value:
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />

              {errors.email && (
                <span className="text-[11px] text-red-400 tracking-wide font-light">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div
              ref={addToRefs}
              className="flex flex-col space-y-1.5 relative"
            >
              <label className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-xl bg-black/20 border ${errors.password
                      ? 'border-red-500/50 focus:border-red-500'
                      : 'border-white/10 focus:border-[#b0784c]/60'
                    } focus:bg-black/40 text-white placeholder-stone-600 focus:outline-none transition-all duration-300 text-sm pr-10`}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message:
                        'Password must be at least 6 characters',
                    },
                  })}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>

              {errors.password && (
                <span className="text-[11px] text-red-400 tracking-wide font-light">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Submit */}
            <div ref={addToRefs} className="pt-3">
              <button
                type="submit"
                className="w-full cursor-pointer py-3.5 bg-white text-black font-bold tracking-widest uppercase text-xs rounded-full hover:bg-[#b0784c] hover:text-white transform active:scale-[0.98] transition-all duration-300 shadow-md"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Login Switch */}
          <div ref={addToRefs} className="text-center mt-6">
            <p className="text-xs text-stone-400 tracking-wide">
              Already have an account?{' '}
              <button
                onClick={() => setFlag(true)}
                className="text-white font-semibold underline underline-offset-4 hover:text-[#b0784c] transition-colors duration-200">
                Log In
              </button>
            </p>
          </div>

          {/* Divider */}
          <div
            ref={addToRefs}
            className="relative flex py-4 items-center"
          >
            <div className="flex-grow border-t border-white/5"></div>

            <span className="flex-shrink mx-4 text-[9px] uppercase tracking-widest text-stone-600 font-black">
              Secure Authentication
            </span>

            <div className="flex-grow border-t border-white/5"></div>
          </div>

          {/* Google */}
          <div ref={addToRefs}>
            <button
              type="button"
              className="w-full py-3 flex items-center justify-center space-x-3 rounded-full border border-white/10 bg-white/[0.01] hover:bg-white/[0.05] transition-all duration-300 group"
            >
              <svg
                className="w-4 h-4 text-white group-hover:scale-105 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>

              <span className="text-xs font-semibold tracking-wider text-stone-300 uppercase group-hover:text-white">
                Continue with Google
              </span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] text-stone-500 tracking-widest uppercase font-bold border-t border-white/5">
        <div className="flex items-center space-x-6">
          <span className="opacity-40">
            OFFICIAL PARTNER:
          </span>

          <span className="text-stone-400 hover:text-white transition-colors cursor-default">
            NBA
          </span>

          <span className="text-stone-400 hover:text-white transition-colors cursor-default">
            NFL
          </span>
        </div>

        <div className="text-center md:text-right max-w-xs opacity-40 lowercase font-normal normal-case leading-relaxed">
          Designed for absolute confidence, built for premium durability.
        </div>
      </footer>
    </div>
  );
};

export default RegisterPage;