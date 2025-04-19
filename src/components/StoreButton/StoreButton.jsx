import { useState } from 'react'
import ProductItem from '../ProductItem/ProductItem'
import './style.css'

const StoreButton = () => {
	const [isShopOpen, setIsShopOpen] = useState(false)

	const handleButtonClick = () => {
		setIsShopOpen(prev => !prev)
	}

	const products = [
		{ img: '/img/products/jar2.png', name: 'Omega-3 ' },
		{ img: '/img/products/jar2.png', name: 'Vitamin D3 ' },
		{ img: '/img/products/jar2.png', name: 'Probiotic' },
		{ img: '/img/products/jar2.png', name: 'Probiotic' },

		{ img: '/img/products/jar2.png', name: 'Omega-3 ' },
		{ img: '/img/products/jar2.png', name: 'Vitamin D3 ' },
		{ img: '/img/products/jar2.png', name: 'Probiotic' },
		{ img: '/img/products/jar2.png', name: 'Probiotic' },

		{ img: '/img/products/jar2.png', name: 'Omega-3 ' },
		{ img: '/img/products/jar2.png', name: 'Vitamin D3 ' },
		{ img: '/img/products/jar2.png', name: 'Probiotic' },
		{ img: '/img/products/jar2.png', name: 'Probiotic' },

		{ img: '/img/products/jar2.png', name: 'Omega-3 ' },
		{ img: '/img/products/jar2.png', name: 'Vitamin D3 ' },
		{ img: '/img/products/jar2.png', name: 'Probiotic' },
		{ img: '/img/products/jar2.png', name: 'Probiotic' },
	]

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
					<div className='shop-overlay-content'>
						<div className='store-header'>
							<h1 className='store-heading'>
								<span className='store-heading-gradient'>YOD</span> store
							</h1>
							<h2 className='store-subtitle-frame'>AI-Powered Health Shop</h2>
						</div>
						<div className='product-list'>
							{products.map((product, index) => (
								<ProductItem key={index} product={product} />
							))}
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default StoreButton
