import { useState } from 'react'
import './style.css'

const ShopButton = () => {
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
				<div className='shop-button-label'>shop</div>
			</div>

			<div className={`shop-overlay ${isShopOpen ? 'active' : ''}`}></div>
		</>
	)
}

export default ShopButton
