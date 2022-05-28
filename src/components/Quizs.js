import { useNavigate } from 'react-router-dom'
import Subject from '../data/Subject.json'
import QuizItem from './QuizItem'
import Searchbar from './Searchbar'

const Quizs = () => {
	const navigator = useNavigate()
	return (
		<div>
			<Searchbar />
			<button
				className='bg-green-400 p-2 duration-500 my-4
        		hover:bg-green-500 text-white rounded-md active:ring-4 ring-green-400'
				onClick={() => navigator(-1)}
			>
				Trở về
			</button>
			<div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 '>
				{Subject.map((item) => (
					<QuizItem key={item.Id} data={item} />
				))}
			</div>
		</div>
	)
}

export default Quizs
