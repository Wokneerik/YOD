import React, { Suspense } from 'react'
import './App.css'
import Loader from './components/Loader/index.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

const Scene = React.lazy(() =>
	import('./components/SceneCanvas/SceneCanvas.jsx')
)

function HomePage() {
	return (
		<Suspense fallback={<Loader />}>
			<Scene />
		</Suspense>
	)
}

function App() {
	return (
		<AuthContextProvider>
			<HomePage />
		</AuthContextProvider>
	)
}

export default App
