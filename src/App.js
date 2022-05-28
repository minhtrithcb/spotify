import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MusicLayout from './layout/MusicLayout'
import Music from './components/Music'
import Search from './components/Search'
import Home from './components/Music/Home'
import Album from './components/Music/Album'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MusicLayout />}>
					<Route path='/' element={<Home />} />
					<Route path='/search' element={<Search />} />
					<Route path='/music' element={<Music />} />
					<Route path='/album/:id' element={<Album />} />
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
