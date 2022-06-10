import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	albumPlayList: [],
	albumInfo: null,
	currentSong: null,
	indexSong: 0,
	isPlaying: false,
}

export const musicSlide = createSlice({
	name: 'music',
	initialState,
	reducers: {
		setAlbum: (state, action) => {
			state.albumInfo = action.payload
		},
		setPlayList: (state, action) => {
			state.albumPlayList = action.payload
		},
		setIndexSong: (state, action) => {
			state.indexSong = action.payload
		},
		setIsPlaying: (state, action) => {
			state.isPlaying = action.payload
		},
		setMusic: (state, action) => {
			const { indexSong, currentSong, albumPlayList } = action.payload
			state.albumPlayList = albumPlayList
			state.currentSong = currentSong
			state.indexSong = indexSong
		},
	},
})

export const { setAlbum, setPlayList, setIndexSong, setIsPlaying, setMusic } =
	musicSlide.actions
export default musicSlide.reducer
