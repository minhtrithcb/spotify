import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Music from './components/Music'
import Home from './components/Music/Home'
import QuizDetail from './components/QuizDetail'
import Quizs from './components/Quizs'
import Todo from './components/Todo'
import MusicLayout from './layout/MusicLayout'
import PrimaryLayout from './layout/PrimaryLayout'
import PrivateRoute from './route/PrivateRoute'
import ReverseRoute from './route/ReverseRoute'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MusicLayout />}>
					<Route path='/' element={<Home />} />
					<Route path='/music' element={<Music />} />
				</Route>

				<Route path='/todo' element={<Todo />} />

				<Route element={<ReverseRoute />}>
					<Route path='/login' element={<Login />} />
				</Route>

				<Route element={<PrivateRoute />}>
					<Route path='/quizs' element={<PrimaryLayout />}>
						<Route path=':id' element={<QuizDetail />} />
						<Route index element={<Quizs />} />
					</Route>
				</Route>

				<Route
					path='*'
					element={
						<main style={{ padding: '1rem' }}>
							<p>There's nothing here!</p>
						</main>
					}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
