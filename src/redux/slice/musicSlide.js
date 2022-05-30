import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	playList: [],
	album: null,
	indexMusic: 0,
}

export const musicSlide = createSlice({
	name: 'music',
	initialState,
	reducers: {
		setAlbum: (state, action) => {
			state.album = action.payload
		},
		setPlayList: (state, action) => {
			state.playList = action.payload
		},
		setPlayIndex: (state, action) => {
			state.indexMusic = action.payload
		},
	},
})

export const { setAlbum, setPlayList, setPlayIndex } = musicSlide.actions
export default musicSlide.reducer
