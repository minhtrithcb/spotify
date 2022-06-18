import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function PrivateRoute() {
	const auth = useAuth()
	let location = useLocation()

	if (auth === 'pending') {
		return <></>
	}

	return auth ? (
		<Outlet />
	) : (
		<Navigate to='/login' state={{ from: location.pathname }} replace />
	)
}
