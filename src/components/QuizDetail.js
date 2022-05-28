import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Subject from '../data/Subject.json'

const QuizDetail = () => {
	const { id } = useParams()
	const navigator = useNavigate()
	const [subject, setSubject] = useState([])
	const [subjectDetail, setSubjectDetail] = useState([])

	useEffect(() => {
		const subjectFound = Subject.find((s) => s.Id === id)
		if (!subjectFound) return navigator('/')
		setSubject(subjectFound)
		try {
			const DATA = require(`../data/quiz/${id}.json`)
			const ramdom = shuffle(DATA).slice(0, 10)
			setSubjectDetail(ramdom)
		} catch (error) {
			console.log(error)
		}
	}, [id, navigator])

	function shuffle(array) {
		let currentIndex = array.length,
			randomIndex

		// While there remain elements to shuffle.
		while (currentIndex !== 0) {
			// Pick a remaining element. 5,
			randomIndex = Math.floor(Math.random() * currentIndex)
			currentIndex--

			// And swap it with the current element.
			;[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			]
		}

		return array
	}

	return (
		<>
			<span
				onClick={() => navigator(-1)}
				className='cursor-pointer p-2 bg-slate-300'
			>
				Trở về
			</span>
			<p className='my-4'>QuizDetail {subject?.name}</p>

			{subjectDetail.map((question, index) => (
				<li key={index}>{question.Text}</li>
			))}
		</>
	)
}

export default QuizDetail
