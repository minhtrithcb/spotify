import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import authApi from '../api/authApi'
import { login } from '../redux/slice/authSlice'
import jwt_decode from 'jwt-decode'

const Login = () => {
	const dispatch = useDispatch()
	const [field, setField] = useState({
		email: '',
		password: '',
	})

	const handleSubmit = async (e) => {
		e.preventDefault()
		const { data } = await authApi.login(field)
		if (data.success) {
			const user = jwt_decode(data.accessToken)
			dispatch(
				login({
					currentUser: user,
					isLogin: true,
				})
			)
		}
	}

	return (
		<div className='w-full h-screen bg-slate-200'>
			<div className='bg-white w-1/2 absolute left-1/2 rounded-md -translate-x-1/2 top-1/2 -translate-y-1/2 py-10 shadow-lg px-4'>
				<h1 className='text-3xl mb-10 text-center'>Login</h1>
				<form onSubmit={handleSubmit}>
					<input
						type='email'
						className='p-4 w-full mb-4 rounded border-2'
						placeholder='Nhập email'
						name='email'
						onChange={(e) =>
							setField((prev) => ({
								...prev,
								[e.target.name]: e.target.value,
							}))
						}
					/>
					<input
						type='password'
						className='p-4 w-full mb-4 rounded border-2'
						placeholder='Nhập mật khẩu'
						name='password'
						onChange={(e) =>
							setField((prev) => ({
								...prev,
								[e.target.name]: e.target.value,
							}))
						}
					/>

					<button
						type='submit'
						className='w-full bg-orange-300 py-4 rounded'
					>
						Đăng nhập
					</button>
				</form>
			</div>
		</div>
	)
}

export default Login
