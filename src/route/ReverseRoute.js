import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function ReverseRoute() {
	const auth = useAuth()
	const location = useLocation()
	if (auth === 'pending') {
		return <></>
	}

	return !auth ? (
		<Outlet />
	) : (
		<Navigate to={`${location?.state?.from ?? '/'}`} replace />
	)
}
