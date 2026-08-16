import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import authService from '../services/AuthServices'
import { loginSuccess, logoutSuccess } from '../redux/features/authSlice'
import Logo from '../components/Logo/Logo'

function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetPassClick, setResetPassClick] = useState(false);
  const [resetPassText, setResetPassText] = useState(false);


  const handleResetPass = () => {
    setResetPassText(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authService.login({ email, password });
      const user = await authService.getCurrentUser();
      if (user) {
        dispatch(loginSuccess({
          id: user.$id,
          email: user.email,
          name: user.name
        }))
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      setError(error.message)
      if (error.code === 400) setError('Password must be between 8 and 256 characters long . .');
      if (error.code === 429) setError('Something Went Wrong! Please try again after some time . .');
      handleResetPass();
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
              Sign in to your account
              <span className='text-sm text-red-400 block'>{error}</span>
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none" placeholder="name@gmail.com" required="" />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none" required="" />
              </div>
              {
                // Forgot password Feture functionality.....
                resetPassText && (<div className="flex  items-start gap-1">
                  <span onClick={() => setResetPassClick(prev => !prev)} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">Forgot password?</span>

                  {resetPassClick && (
                    <p className="text-sm font-light text-gray-900 dark:text-gray-400 text-center">-Call us at <a href="tel:+916289376409" className="font-medium text-primary-600 hover:underline dark:text-primary-500">+91-6289376409</a>
                    </p>
                  )}

                </div>)
              }
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
              <p className="text-sm font-light m-0 text-gray-900 dark:text-gray-400">
                Already have an account? <Link to={'/register'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
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

export default Login