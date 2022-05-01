import { ReactNode } from 'react'

export const Box = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'space-between',
        flexDirection: 'column',
        width: 300,
        border: '1px solid black',
        padding: 20,
      }}
    >
      {children}
    </div>
  )
}
