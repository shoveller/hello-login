import { FC, PropsWithChildren } from 'react'

export const Input: FC<PropsWithChildren<{ id: string; name: string }>> = ({
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
