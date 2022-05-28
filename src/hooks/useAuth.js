import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAccessTK } from '../redux/slice/authSlice'

const useAuth = () => {
	const dispatch = useDispatch()
	const { isLogin, loading } = useSelector((state) => state.auth)

	useEffect(() => {
		const getAccessTk = async () => {
			try {
				dispatch(getAccessTK())
			} catch (error) {
				console.log(error)
			}
		}
		getAccessTk()
	}, [dispatch])

	if (loading) return 'pending'
	return isLogin
}

export default useAuth
