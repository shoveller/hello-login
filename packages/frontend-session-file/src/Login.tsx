import { FC, FormEventHandler, PropsWithChildren, useCallback } from 'react'

const Input: FC<PropsWithChildren<{ id: string; name: string }>> = ({
  children,
  id,
  name,
}) => {
  return (
    <label htmlFor={id} style={{ marginTop: 10 }}>
      {children}
      <input id={id} name={name} type="text" />
    </label>
  )
}

export const Login = () => {
  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault()
    const values = new FormData(e.target as HTMLFormElement)
    const id = values.get('id') as string
    const pass = values.get('pass') as string

    fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({ id, pass })
    }).then(res => res.json()).then(body => alert(JSON.stringify(body)))
  }, [])

  return (
    <form onSubmit={onSubmit}>
      <div style={{ display: 'flex', alignItems: 'space-between', flexDirection: 'column', width: 300, border: '1px solid black', padding: 20 }}>
        <Input id="id" name="id">
          아이디
        </Input>
        <Input id="pass" name="pass">
          패스워드
        </Input>
        <button style={{ marginTop: 20 }} type="submit">로그인</button>
      </div>
    </form>
  )
}
