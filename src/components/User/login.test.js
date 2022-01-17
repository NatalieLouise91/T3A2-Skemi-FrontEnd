import { MemoryRouter, Routes, Route } from "react-router-dom"
import { StateProvider } from "../utils/stateContext.js"

import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, fireEvent } from '@testing-library/react'

import Login from './Login.js'

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Login', async () => {
  server.use(
    rest.post('http://localhost:3000/api/auth/sign_in', (req, res, ctx) => {
      return res(ctx.json({
        email: 'email.com',
        jwt: 'jwt string'
      }))
    }),
  )

  render(
    <MemoryRouter initialEntries={["/login"]}>
      <StateProvider>
        <Routes>
          <Route path="/" element={<>Skemi</>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </StateProvider>
    </MemoryRouter>
  )

  await screen.findByText('Sign in your account')

  const emailField = await screen.findByTestId('email')
  fireEvent.change(emailField, { target: { value: 'email.com' }})

  const passwordField = await screen.findByTestId('password')
  fireEvent.change(passwordField, { target: { value: 'password' }})

  const loginButton = await screen.findByTestId('login_button')
  fireEvent.click(loginButton)

  await screen.findByText('Skemi')
})