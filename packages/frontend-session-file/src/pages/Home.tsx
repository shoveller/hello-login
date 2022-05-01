import axios from 'axios'
import { useResetAtom } from 'jotai/utils'
import { FormEventHandler, useCallback } from 'react'

import { Box } from '../components/Box'
import { loginAtom } from '../stores/login'

export const Home = () => {
  const logout = useResetAtom(loginAtom)
  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      const values = new FormData(e.target as HTMLFormElement)
      const id = values.get('id')
      axios
        .post('http://localhost:3000/logout', { id }, { withCredentials: true })
        .then(() => {
          logout()
        })
    },
    [logout],
  )

  return (
    <Box>
      <span>로그인 됨</span>
      <form onSubmit={onSubmit}>
        <input name="id" type="hidden" value="a" />
        <button type="submit">로그아웃</button>
      </form>
    </Box>
  )
}
