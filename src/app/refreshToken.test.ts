import axios, { AxiosAdapter } from 'axios'
import { refreshToken } from './refreshToken'

const originalAdapter = axios.defaults.adapter
const originalHost = process.env.REACT_APP_HOST

afterEach(() => {
  axios.defaults.adapter = originalAdapter
  if (originalHost === undefined) delete process.env.REACT_APP_HOST
  else process.env.REACT_APP_HOST = originalHost
  localStorage.clear()
})

test('sends refresh credentials as JSON and returns the GraphQL response through Axios', async () => {
  process.env.REACT_APP_HOST = 'https://api.example.test'
  localStorage.setItem('user.id', 'user-1')
  localStorage.setItem('user.token', 'expired-token')
  localStorage.setItem('user.refreshToken', 'refresh-token')
  const payload = { data: { refreshToken_v1: { token: 'new-token', refreshToken: 'new-refresh-token' } } }
  const adapter: AxiosAdapter = async (config) => {
    expect(config.url).toBe('https://api.example.test/graphql')
    expect(config.method).toBe('post')
    expect(config.headers.get('Content-Type')).toBe('application/json')
    const body = JSON.parse(config.data)
    expect(body.variables).toEqual({ userId: 'user-1', token: 'expired-token', refreshToken: 'refresh-token' })
    expect(body.query).toContain('refreshToken_v1')
    return { data: JSON.stringify(payload), status: 200, statusText: 'OK', headers: {}, config }
  }
  axios.defaults.adapter = adapter

  expect((await refreshToken()).data).toEqual(payload)
})

test('propagates transport failures to the token refresh handler', async () => {
  const error = new Error('Network unavailable')
  axios.defaults.adapter = async () => { throw error }

  await expect(refreshToken()).rejects.toBe(error)
})
