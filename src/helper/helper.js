export const subString = (str, limit) => {
	return str.length < limit ? str : `${str.substring(0, limit)} ...`
}
