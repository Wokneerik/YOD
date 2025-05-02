import './styles.css'

const BottomNavigation = ({
	disabled = false,
	onClick,
	buttonText = 'NEXT',
	isEdit = false,
}) => {
	return (
		<div className='bottom-nav'>
			{disabled ? (
				<button className='next-button disabled' disabled>
					{buttonText}
				</button>
			) : (
				<button className='next-button' onClick={onClick}>
					{buttonText}
				</button>
			)}
		</div>
	)
}

export default BottomNavigation
