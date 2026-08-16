import { useEffect } from 'react'
import AppRoute from './routes/AppRoute'
import { loginSuccess, logoutSuccess } from './redux/features/authSlice'
import authService from './services/AuthServices'
import { useDispatch } from 'react-redux'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch(loginSuccess({
            id: user.$id,
            email: user.email,
            name: user.name,
          }))
        }
        else {
          dispatch(logoutSuccess());
        }
      } catch (error) {
        dispatch(logoutSuccess());
      }
    };
    checkSession();
  }, [])

  return (
    <>
        <AppRoute />
    </>
  )
}

export default App
