export const subString = (str, limit) => {
	return str.length < limit ? str : `${str.substring(0, limit)} ...`
}

export function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}
