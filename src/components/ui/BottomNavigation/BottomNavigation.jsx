import './styles.css'

const BottomNavigation = ({ link, disabled = false, onClick }) => {
	return (
		<div className='bottom-nav'>
			{disabled ? (
				<button className='next-button disabled' disabled>
					NEXT
				</button>
			) : (
				<button className='next-button' onClick={onClick}>
					NEXT
				</button>
			)}
		</div>
	)
}

export default BottomNavigation
