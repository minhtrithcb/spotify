import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	albumPlayList: [], // array contain currnet playlist
	albumInfo: null, // state when user chose album
	currentSong: null, // the current song user play
	indexSong: 0, // position song in playlist
	isPlaying: false, // flag to track song is Play
	togglePlay: false, // flag to toggle song play
	searchPlayList: [], // array contain search on playlist
}

export const musicSlide = createSlice({
	name: 'music',
	initialState,
	reducers: {
		setAlbum: (state, action) => {
			state.albumInfo = action.payload
		},
		setSearchPlayList: (state, action) => {
			state.searchPlayList = action.payload
		},
		setTogglePlay: (state, action) => {
			state.togglePlay = action.payload
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

export const {
	setAlbum,
	setPlayList,
	setIndexSong,
	setIsPlaying,
	setMusic,
	setTogglePlay,
	setSearchPlayList,
} = musicSlide.actions
export default musicSlide.reducer
