import { configureStore } from '@reduxjs/toolkit'
import { vi } from 'vitest'
import type { UserToken } from './userSlice'

const credentials: UserToken = {
  token: 'access-token',
  refreshToken: 'refresh-token',
  user: { id: 'user-1', email: 'user@example.test', verified: false, roles: [{ name: 'user' }] },
}

beforeEach(() => {
  localStorage.clear()
  vi.resetModules()
})

afterEach(() => localStorage.clear())

test('login and logout update the Redux store and persisted credentials', async () => {
  const { default: reducer, login, logout, selectUser } = await import('./userSlice')
  const store = configureStore({ reducer: { user: reducer } })
  expect(selectUser(store.getState())).toBeUndefined()

  store.dispatch(login(credentials))
  expect(selectUser(store.getState())).toEqual({ ...credentials.user, token: credentials.token })
  expect(localStorage.getItem('user.token')).toBe(credentials.token)
  expect(localStorage.getItem('user.refreshToken')).toBe(credentials.refreshToken)
  expect(localStorage.getItem('user.verified')).toBe('false')

  store.dispatch(logout())
  expect(selectUser(store.getState())).toBeUndefined()
  for (const key of ['user.token', 'user.refreshToken', 'user.id', 'user.roles', 'user.verified']) {
    expect(localStorage.getItem(key)).toBeNull()
  }
})

test.each([false, true])('restores the persisted verified flag as %s after reloading', async (verified) => {
  const { default: reducer, login } = await import('./userSlice')
  const store = configureStore({ reducer })
  store.dispatch(login({ ...credentials, user: { ...credentials.user, verified } }))

  vi.resetModules()
  const { default: reloadedReducer } = await import('./userSlice')
  const reloaded = configureStore({ reducer: reloadedReducer })
  expect(reloaded.getState().user).toEqual({ ...credentials.user, verified, token: credentials.token })
})
