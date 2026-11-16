import React, { PropsWithChildren } from 'react'
import { act, renderHook } from '@testing-library/react'
import { Provider } from 'react-redux'
import { useAppDispatch, useAppSelector, useAppStore } from './hooks'
import { login, logout, selectUser } from './reducers/userSlice'
import { store } from './store'

afterEach(() => {
  store.dispatch(logout())
  localStorage.clear()
})

test('typed hooks receive the app store and react to login and logout', () => {
  const { result } = renderHook(() => ({ dispatch: useAppDispatch(), user: useAppSelector(selectUser), store: useAppStore() }), {
    wrapper: ({ children }: PropsWithChildren) => <Provider store={store}>{children}</Provider>,
  })
  expect(result.current.store).toBe(store)
  expect(result.current.user).toBeUndefined()

  act(() =>
    result.current.dispatch(
      login({
        token: 'access-token',
        refreshToken: 'refresh-token',
        user: { id: 'user-1', email: 'user@example.test', verified: true, roles: [{ name: 'admin' }] },
      }),
    ),
  )
  expect(result.current.user?.roles).toEqual([{ name: 'admin' }])

  act(() => result.current.dispatch(logout()))
  expect(result.current.user).toBeUndefined()
})
