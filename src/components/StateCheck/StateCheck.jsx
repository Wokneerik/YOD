import { useCallback, useEffect, useRef, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { svgSmilesStatus } from '../../../constants'
import {
	setShowHealthConditionButton,
	setSliderVisible,
	setStateCheck,
} from '../../store/state-check.slice'
import './style.css'

const StateCheck = () => {
	const dispatch = useDispatch()
	const {
		stateCheck,
		sliderVisible,
		showHealthConditionButton,
		isControlsBtnVisible,
	} = useSelector(
		state => ({
			stateCheck: state.stateCheck.stateCheck,
			sliderVisible: state.stateCheck.sliderVisible,
			showHealthConditionButton: state.stateCheck.showHealthConditionButton,
			isControlsBtnVisible: state.controls.isControlsBtnVisible,
		}),
		shallowEqual
	)

	console.log('CHECK RERENDERS IN STATE CHECK ')

	const [openStateScreen, setOpenStateScreen] = useState(false)
	const sliderRef = useRef(null)
	const smileyRef = useRef(null)
	const timeoutRef = useRef(null)
	const containerRef = useRef(null)

	const [isSliderTouched, setIsSliderTouched] = useState(false)

	const [isShutterPressed, setIsShutterPressed] = useState(false)

	const handleShutterPress = () => {
		setIsShutterPressed(true)
		setTimeout(() => {
			setIsShutterPressed(false)
		}, 100)
	}

	const createMarks = () => {
		return Array.from({ length: 11 }, (_, i) => (
			<div
				key={i}
				className={`slider-mark ${
					i === 0 || i === 5 || i === 10 ? 'main' : ''
				}`}
			/>
		))
	}

	const createLabels = () => {
		return svgSmilesStatus.map((svg, index) => (
			<div
				key={index}
				className='label'
				dangerouslySetInnerHTML={{ __html: svg }}
				style={{
					left: `${index * 50}%`,
					transform: 'translateX(-50%)',
				}}
			/>
		))
	}

	const handleSliderInput = useCallback(
		event => {
			const value = parseInt(event.target.value)
			dispatch(setStateCheck(value))

			if (timeoutRef.current) clearTimeout(timeoutRef.current)

			timeoutRef.current = setTimeout(() => {
				dispatch(setSliderVisible(false))
				dispatch(setShowHealthConditionButton(true))
			}, 1200)

			if (smileyRef.current) {
				const smileyPath = smileyRef.current.querySelector('path')
				if (smileyPath) {
					let d, stroke

					if (value < 50) {
						const t = value / 50
						const controlPointY = -2 + t * 2
						d = `M8 15c2 ${controlPointY} 6 ${controlPointY} 8 0`
						stroke = `rgb(${255}, ${255 * t}, 0)`
					} else {
						const t = (value - 50) / 50
						const controlPointY = 0 + t * 2
						d = `M8 15c2 ${controlPointY} 6 ${controlPointY} 8 0`
						stroke = `rgb(${255 - t * 255}, ${255 - t * 85}, 0)`
					}

					smileyPath.setAttribute('d', d)
					smileyPath.setAttribute('stroke', stroke)

					if (sliderRef.current) {
						sliderRef.current.style.background = `linear-gradient(to right, ${stroke} ${value}%, white ${value}%)`
					}
				}

				const maxHeight = -25
				const progress = value / 100
				const t = progress
				const y = maxHeight * (1 - Math.pow(1 - t, 3))

				const containerWidth = containerRef.current?.offsetWidth ?? 0
				const pixelOffset = (containerWidth - 18) * (value / 100)

				smileyRef.current.style.visibility = 'visible'
				smileyRef.current.style.transform = `translate(${pixelOffset}px, ${y}px)`
			}
		},
		[dispatch]
	)

	const handleTouchStart = () => {
		setIsSliderTouched(true)
	}

	const handleTouchEnd = () => {
		setIsSliderTouched(false)
	}

	useEffect(() => {
		const slider = sliderRef.current
		if (slider) {
			slider.addEventListener('touchstart', handleTouchStart)
			slider.addEventListener('touchend', handleTouchEnd)
		}

		return () => {
			if (slider) {
				slider.removeEventListener('touchstart', handleTouchStart)
				slider.removeEventListener('touchend', handleTouchEnd)
			}
		}
	}, [])

	// Calculate button position
	const calculateSmallCirclePosition = () => {
		const outerCircleRadius = 30
		const angle = (180 - (stateCheck * 180) / 100) * (Math.PI / 180)
		const baseX = 30
		const baseY = 31
		const offsetX = outerCircleRadius * Math.cos(angle)
		const offsetY = outerCircleRadius * Math.sin(angle)

		return {
			left: `${baseX + offsetX}px`,
			bottom: `${baseY + offsetY}px`,
		}
	}

	// Get smiley path and stroke for the button
	const getSmileyProperties = () => {
		let d, stroke

		if (stateCheck < 50) {
			const t = stateCheck / 50
			const controlPointY = -2 + t * 2
			d = `M8 15c2 ${controlPointY} 6 ${controlPointY} 8 0`
			stroke = `rgb(${255}, ${255 * t}, 0)`
		} else {
			const t = (stateCheck - 50) / 50
			const controlPointY = 0 + t * 2
			d = `M8 15c2 ${controlPointY} 6 ${controlPointY} 8 0`
			stroke = `rgb(${255 - t * 255}, ${255 - t * 85}, 0)`
		}

		return { d, stroke }
	}

	const handleButtonClick = () => {
		setOpenStateScreen(prev => !prev)
	}

	return (
		<>
			{sliderVisible && (
				<>
					<div className='cloud-wrapper'>
						<img
							src='/img/cloudState.png'
							alt='Cloud'
							className='cloud-image'
						/>
						<div className='cloud-text'>
							How are <br />
							you feeling?
						</div>
					</div>

					<div className='slider-container' ref={containerRef}>
						<input
							ref={sliderRef}
							type='range'
							min='0'
							max='100'
							defaultValue='0'
							className='slider'
							onInput={handleSliderInput}
						/>

						<div className='slider-marks'>
							{createMarks()}
							{createLabels()}
						</div>

						<div className='smiley' ref={smileyRef}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								width='25'
								height='25'
							>
								<circle
									cx='12'
									cy='12'
									r='10'
									fill='none'
									stroke='white'
									strokeWidth='1'
								/>
								<circle cx='9' cy='10' r='1' fill='white' />
								<circle cx='15' cy='10' r='1' fill='white' />
								<path
									d='M8 15c2-2 6-2 8 0'
									stroke='red'
									fill='none'
									strokeWidth='2'
									strokeLinecap='round'
								/>
							</svg>
						</div>
					</div>

					<div
						className={`slider-overlay ${isSliderTouched ? 'active' : ''}`}
					/>
				</>
			)}

			{showHealthConditionButton && isControlsBtnVisible && (
				<>
					<div className='button-container' onClick={handleButtonClick}>
						<div className='outer-circle'>
							{!openStateScreen && (
								<div className='state-check-text'>{stateCheck}</div>
							)}

							{openStateScreen && <div className='showing-close-img' />}
							<div className='state-check-label'>wellness</div>
						</div>
						<div className='inner-circle' />
						<div
							className='small-circle'
							style={calculateSmallCirclePosition()}
						>
							<div className='smileyInButton'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									width='20'
									height='20'
								>
									<path
										d={getSmileyProperties().d}
										stroke={getSmileyProperties().stroke}
										fill='none'
										strokeWidth='1.5'
										strokeLinecap='round'
									/>
								</svg>
							</div>
						</div>
					</div>
					<div
						className={`state-check-overlay ${openStateScreen ? 'active' : ''}`}
					>
						{openStateScreen && (
							<>
								<div className={'state-check-camera-shutter-button'}>
									<div
										className={`state-check-camera-shutter-button-inner ${
											isShutterPressed ? 'pressed' : ''
										}`}
										onClick={handleShutterPress}
									></div>
								</div>
								<div className='face-frame-container'>
									<svg viewBox='0 0 240 250' xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M 120 30
           C 90 30, 65 50, 55 90
           C 50 115, 50 140, 55 165
           C 60 190, 75 210, 90 225
           C 100 235, 110 240, 120 242
           C 130 240, 140 235, 150 225
           C 165 210, 180 190, 185 165
           C 190 140, 190 115, 185 90
           C 175 50, 150 30, 120 30 Z'
											fill='none'
											stroke='white'
											strokeWidth={3}
											strokeDasharray='5 5'
										/>
									</svg>
								</div>
							</>
						)}
					</div>
				</>
			)}
		</>
	)
}

export default StateCheck
