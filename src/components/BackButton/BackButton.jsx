import { useEffect } from 'react'

const BackButton = ({
	setIsBackBtnVisible,
	setIsControlsBtnVisible,
	onReset,
	setBrainBtnClick,
	setFaceBtnClick,
	setBodyBtnClick,
}) => {
	useEffect(() => {
		const style = document.createElement('style')
		style.textContent = `
      .back-button {
        position: fixed;
				top: 20px;
        left: 20px;
				width: 50px;
        height: 50px;
        margin-bottom: 20px; 
        border: 7px solid white;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        z-index: 9990; 
      }
    `
		document.head.appendChild(style)

		const createButton = () => {
			const button = document.createElement('div')
			button.className = 'back-button'
			button.style.backgroundImage = 'url("/img/buttons/back.png")'

			document.body.appendChild(button)

			button.addEventListener('click', () => {
				setIsBackBtnVisible(false)
				setIsControlsBtnVisible(true)
				onReset()
				setBrainBtnClick(false)
				setFaceBtnClick(false)
				setBodyBtnClick(false)
			})

			return button
		}

		const button = createButton()

		return () => {
			style.remove()
			button.remove()
		}
	}, [])

	return null
}

export default BackButton
