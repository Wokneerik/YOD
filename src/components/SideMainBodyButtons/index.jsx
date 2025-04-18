import { useEffect } from 'react'
import { sideMainButtonConfig } from '../../constants'

const SideMainBodyButtons = ({
	onButtonClick,
	setIsControlsBtnVisible,
	setBrainBtnClick,
	setFaceBtnClick,
	setBodyBtnClick,
}) => {
	useEffect(() => {
		const style = document.createElement('style')
		style.textContent = `
      .control-button {
        position: fixed;
        left: 20px;
        width: 60px;
        height: 60px;
        margin-bottom: 15px; 
        border: 7px solid white;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        z-index: 9997; 
				opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease, background-image 0.3s ease;
      }

			.control-button.show {
        opacity: 1;
       
      }
    `
		document.head.appendChild(style)

		const buttons = sideMainButtonConfig.map(
			({ index, imagePath, position, lookAt, zoom, targetFov }) => {
				const button = document.createElement('div')
				button.className = 'control-button'
				button.style.backgroundImage = `url(${imagePath})`

				// Calculate position
				const totalButtons = sideMainButtonConfig.length
				const buttonHeight = 70
				const buttonMargin = 20
				const totalHeight =
					totalButtons * buttonHeight + (totalButtons - 1) * buttonMargin
				const screenHeight = window.innerHeight
				const topOffset =
					(screenHeight - totalHeight) / 2 +
					index * (buttonHeight + buttonMargin)
				button.style.top = `${topOffset}px`

				button.addEventListener('click', () => {
					onButtonClick(position, lookAt, zoom, targetFov)

					setIsControlsBtnVisible(false)

					if (index === 0) {
						setFaceBtnClick(true)
					}

					if (index === 1) {
						setBrainBtnClick(true)
					}

					if (index === 2) {
						setBodyBtnClick(true)
					}
				})

				document.body.appendChild(button)

				setTimeout(() => button.classList.add('show'), 200)

				return button
			}
		)

		// Update positions on window resize
		const handleResize = () => {
			buttons.forEach((button, index) => {
				const buttonHeight = 80
				const buttonMargin = 20
				const totalHeight =
					buttons.length * buttonHeight + (buttons.length - 1) * buttonMargin
				const screenHeight = window.innerHeight
				const topOffset =
					(screenHeight - totalHeight) / 2 +
					index * (buttonHeight + buttonMargin)
				button.style.top = `${topOffset}px`
			})
		}
		window.addEventListener('resize', handleResize)

		// Cleanup on unmount
		return () => {
			buttons.forEach(button => button.remove())
			style.remove()
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return null
}

export default SideMainBodyButtons
