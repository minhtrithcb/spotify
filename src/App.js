import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MusicLayout from './layout/MusicLayout'
import Search from './components/Search'
import Home from './components/Music/Home'
import Album from './components/Music/Album'
import Library from './components/Library'
// import Login from './components/Login'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MusicLayout />}>
					<Route path='/' element={<Home />} />
					<Route path='/search' element={<Search />} />
					<Route path='/your-library' element={<Library />} />
					<Route path='/album/:id' element={<Album />} />
				</Route>
				{/* <Route path='/login' element={<Login />} /> */}

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
