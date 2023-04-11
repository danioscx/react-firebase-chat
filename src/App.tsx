import React from 'react'
import { Route, Routes } from 'react-router-dom'
const Chat = React.lazy(() => import('./pages').then(({ Chat }) => ({ default: Chat })))
const SignIn = React.lazy(() => import('./pages').then(({ SignIn }) => ({ default: SignIn })))

const App: React.FC = () => {

	return (
		<Routes>
			<Route
				path="/"
				element={
					<SignIn />
				} />
			<Route
				path="/chat"
				element={
					<Chat />
				} />
		</Routes>
	)
}

export { App }
