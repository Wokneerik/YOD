import { useEffect } from 'react'
import { sideMainButtonConfig } from '../../../constants'

const SideMainButtons = ({
	onButtonClick,
	setIsControlsBtnVisible,
	setBrainBtnClick,
	setFaceBtnClick,
	setBodyBtnClick,
}) => {
	useEffect(() => {
		const style = document.createElement('style')
		style.textContent = `
      .control-button-container {
        position: fixed;
        left: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        z-index: 9997;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease, background-image 0.3s ease;
      }

      .control-button-container.show {
        opacity: 1;
      }

      .control-button {
        width: 50px;
        height: 50px;
        border: 7px solid white;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        cursor: pointer;
      }

      .control-button-label {
        font-size: 11px;
        color: white; 
        text-align: center;
        
       
      }
    `
		document.head.appendChild(style)

		const buttonsWithLabels = sideMainButtonConfig.map(
			({ index, imagePath, position, lookAt, zoom, targetFov, label }) => {
				const container = document.createElement('div')
				container.className = 'control-button-container'

				const button = document.createElement('div')
				button.className = 'control-button'
				button.style.backgroundImage = `url(${imagePath})`

				const labelElement = document.createElement('div')
				labelElement.className = 'control-button-label'
				labelElement.textContent = label

				container.appendChild(button)
				container.appendChild(labelElement)

				// Calculate position
				const totalButtons = sideMainButtonConfig.length
				const buttonHeightWithLabel = 90
				const buttonMargin = 20
				const totalHeight =
					totalButtons * buttonHeightWithLabel +
					(totalButtons - 1) * buttonMargin
				const screenHeight = window.innerHeight
				const topOffset =
					(screenHeight - totalHeight) / 2 +
					index * (buttonHeightWithLabel + buttonMargin)
				container.style.top = `${topOffset}px`

				container.addEventListener('click', () => {
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

				document.body.appendChild(container)

				setTimeout(() => container.classList.add('show'), 200)

				return container
			}
		)

		// Update positions on window resize
		const handleResize = () => {
			buttonsWithLabels.forEach((container, index) => {
				const buttonHeightWithLabel = 70
				const buttonMargin = 20
				const totalHeight =
					buttonsWithLabels.length * buttonHeightWithLabel +
					(buttonsWithLabels.length - 1) * buttonMargin
				const screenHeight = window.innerHeight
				const topOffset =
					(screenHeight - totalHeight) / 2 +
					index * (buttonHeightWithLabel + buttonMargin)
				container.style.top = `${topOffset}px`
			})
		}
		window.addEventListener('resize', handleResize)

		// Cleanup on unmount
		return () => {
			buttonsWithLabels.forEach(container => container.remove())
			style.remove()
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return null
}

export default SideMainButtons
