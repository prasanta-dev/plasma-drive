import React, { use, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../services/AuthServices'
import { useDispatch } from 'react-redux';
import { loginSuccess, logoutSuccess } from '../redux/features/authSlice'
import Logo from '../components/Logo/Logo'

function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showTip, setShowTip] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    setError('');
    e.preventDefault();
    if (!email || !password || !name) return;

    try {
      await authService.createUser({ email, password, name });
      await authService.login({ email, password });
      const user = await authService.getCurrentUser();
      if (user) {
        dispatch(loginSuccess({
          id: user.$id,
          email: user.email,
          name: user.name
        }))
        navigate('/');
      }
    }
    catch (error) {
      setError(error.message)
      console.log(error.code)
      if(error.code === 409) setError('This Email is already exists . . .');
      if(error.code === 400) setError('Password must be between 8 and 256 characters long . .');
      if(error.code === 429) setError('Something Went Wrong! Please try again after some time . .');
    }

  }


  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center sm:justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="flex items-center mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
          <Logo />
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up to join us
              <span className='text-sm text-red-400 block'>{error}</span>
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor='name' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none capitalize" placeholder="Prasanta" required="" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none" placeholder="name@gmail.com" required="" />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>

                <div className="relative inline-block w-full group">
                  <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={() => setShowTip(true)}
                    onBlur={() => setShowTip(false)}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500 focus:outline-none"
                    required
                  />

                  {/* Eye toggle button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    tabIndex={-1}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      // Eye-off icon
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                        <path
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    ) : (
                      // Eye icon

                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                        <path
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>


                    )}
                  </button>

                  {/* Tooltip */}
                  <div
                    className={`absolute bottom-full left-0 mb-3 w-56 sm:w-72 max-w-[80vw] transition-all duration-300 ease-out transform z-20
            ${showTip ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-2'}
            group-hover:visible group-hover:opacity-100 group-hover:translate-y-0`}
                  >
                    <div className="relative p-3 sm:p-4 bg-linear-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(20,184,166,0.15)]">
                      <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                        <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-500/20 shrink-0">
                          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xs sm:text-sm font-semibold text-white leading-tight">Remember Your Password</h3>
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <p className="text-xs sm:text-sm text-gray-300 leading-snug">
                          Please remember your email and password for future logins.
                        </p>
                        <div className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-gray-400">
                          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 mt-0.5">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            />
                          </svg>
                          <span>
                            If forgotten,{' '}
                            <Link to="/contact-us" className="text-teal-400 hover:underline font-medium cursor-pointer">
                              Contact us
                            </Link>{' '}
                            to reset it
                          </span>
                        </div>
                      </div>

                      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-linear-to-r from-teal-500/10 to-cyan-500/10 blur-xl opacity-50"></div>
                      <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-linear-to-br from-gray-900/95 to-gray-800/95 rotate-45 border-r border-b border-white/10"></div>
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>

              <p className="text-sm font-light m-0 text-gray-900 dark:text-gray-400">
                Already have an account? <Link to={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
              </p>

              <p className="text-sm font-light text-gray-900 dark:text-gray-400">
                Back to <Link to={'/'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Home</Link>
              </p>

            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register