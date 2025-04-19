import React from 'react'
import './style.css'

const ProductItem = ({ product }) => {
	return (
		<div className='product-item'>
			<div className='product-image-frame'>
				<img src={product.img} alt={product.name} className='product-image' />
			</div>
			<div className='product-name'>{product.name}</div>
		</div>
	)
}

export default ProductItem
