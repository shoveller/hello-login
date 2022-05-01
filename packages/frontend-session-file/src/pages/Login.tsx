import axios from 'axios'
import { useSetAtom } from 'jotai'
import { FormEventHandler, useCallback } from 'react'

import { Box } from '../components/Box'
import { Input } from '../components/Input'
import { loginAtom } from '../stores/login'

export const Login = () => {
  const login = useSetAtom(loginAtom)
  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault()
      const values = new FormData(e.target as HTMLFormElement)
      const id = values.get('id') as string
      const pass = values.get('pass') as string

      axios
        .post('http://localhost:4000/login', JSON.stringify({ id, pass }))
        .then(() => {
          login('true')
        })
    },
    [login],
  )

  return (
    <form onSubmit={onSubmit}>
      <Box>
        <Input id="id" name="id">
          아이디
        </Input>
        <Input id="pass" name="pass">
          패스워드
        </Input>
        <button style={{ marginTop: 20 }} type="submit">
          로그인
        </button>
      </Box>
    </form>
  )
}
