import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Loader from './components/Loader/index.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import Customize from './pages/Customize/Customize.jsx'
import Goal from './pages/Goal/Goal.jsx'
import HeightWeight from './pages/HeightWeight/HeightWeight.jsx'
import Name from './pages/Name/Name.jsx'
import Sex from './pages/Sex/Sex.jsx'
import Welcome from './pages/Welcome/Welcome.jsx'

const Scene = React.lazy(() =>
	import('./components/SceneCanvas/SceneCanvas.jsx')
)

const HomePage = () => {
	return (
		<Suspense fallback={<Loader />}>
			<Scene />
		</Suspense>
	)
}

function App() {
	return (
		<AuthContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/welcome' element={<Welcome />} />

					<Route path='/name' element={<Name />} />
					<Route path='/sex' element={<Sex />} />
					<Route path='/height-weight' element={<HeightWeight />} />
					<Route path='/goal' element={<Goal />} />
					<Route path='/customize' element={<Customize />} />
				</Routes>
			</BrowserRouter>
		</AuthContextProvider>
	)
}

export default App
