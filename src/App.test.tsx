import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import userEvent from '@testing-library/user-event'
import ReactGA from 'react-ga'

ReactGA.initialize('test', { testMode: true })

test('renders the home page and navigates to registration in StrictMode', async () => {
  const user = userEvent.setup()
  window.history.replaceState({}, '', '/')
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )

  expect(screen.getByText(/ready to launch/i)).toBeInTheDocument()
  await user.click(screen.getByRole('link', { name: /try it for free/i }))
  expect(window.location.pathname).toBe('/register')
  expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument()
})
