import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Chat, SignIn } from './pages'

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
