import { useState } from 'react'
import './style.css'

const StoreButton = () => {
	const [isShopOpen, setIsShopOpen] = useState(false)

	const handleButtonClick = () => {
		setIsShopOpen(prev => !prev)
	}

	return (
		<>
			<div
				className={`shop-button ${
					isShopOpen ? 'showing-shop-close' : 'showing-shop-btn'
				}`}
				onClick={handleButtonClick}
				style={{ zIndex: isShopOpen ? 999999 : 9997 }}
			>
				<div className='shop-button-label'>store</div>
			</div>

			<div className={`shop-overlay ${isShopOpen ? 'active' : ''}`}>
				{isShopOpen && (
					<h1 className='store-heading'>
						<span className='store-heading-gradient'>YOD</span> store
					</h1>
				)}
			</div>
		</>
	)
}

export default StoreButton
