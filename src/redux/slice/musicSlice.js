import { createSlice } from '@reduxjs/toolkit'
import { shuffleArray } from '../../helper/helper'

const initialState = {
	albumPlayList: [], // array contain currnet playlist
	playListShuffle: [], // array contain currnet shufflf playlist
	playListQueue: [], // array contain currnet playlist on play
	albumInfo: null, // state when user chose album
	cursorIndexSong: 0, // state when user chose album
	currentSong: null, // the current song user play
	indexSong: 0, // position song in playlist
	isPlaying: false, // flag to track song is Play
	togglePlay: false, // flag to toggle song play
	isLoop: false, // state loop
	isShuffle: false, // state loop
	isMute: false, // state mute
	isOpenDisk: false, // state mute
	searchPlayList: [], // array contain search on playlist
}

export const musicSlice = createSlice({
	name: 'music',
	initialState,
	reducers: {
		setAlbum: (state, action) => {
			state.albumInfo = action.payload
		},
		setCursorIndexSong: (state, action) => {
			state.cursorIndexSong = action.payload
		},
		setIsOpenDisk: (state, action) => {
			state.isOpenDisk = action.payload
		},
		setPlayListShuffle: (state, action) => {
			if (state.playListShuffle.length !== 0) {
				state.isShuffle = !state.isShuffle
				state.playListShuffle = []
				state.currentSong = state.albumPlayList[state.indexSong]
				state.playListQueue = state.albumPlayList
				return
			}
			let newArr = shuffleArray([...state.albumPlayList])
			state.isShuffle = !state.isShuffle
			state.playListShuffle = newArr
			state.currentSong = newArr[state.indexSong]
			state.playListQueue = newArr
		},
		setIsLoop: (state, action) => {
			state.isLoop = action.payload
		},
		setIsMute: (state, action) => {
			state.isMute = action.payload
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
		setCurrentSong: (state, action) => {
			state.currentSong = action.payload
		},
		setMusic: (state, action) => {
			const { indexSong, currentSong, albumPlayList, playListQueue } =
				action.payload
			state.albumPlayList = albumPlayList
			state.currentSong = currentSong
			state.playListQueue = playListQueue
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
	setIsLoop,
	setIsMute,
	setPlayListShuffle,
	setTogglePlay,
	setSearchPlayList,
	setCursorIndexSong,
	setCurrentSong,
	setIsOpenDisk,
} = musicSlice.actions
export default musicSlice.reducer
