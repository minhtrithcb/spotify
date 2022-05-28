import api from './api'

const authApi = {
	async login({ email, password }) {
		return api.post('auth/login', { email, password })
	},
	async getAccessTK() {
		return api.get('auth/accessToken')
	},
}

export default authApi
