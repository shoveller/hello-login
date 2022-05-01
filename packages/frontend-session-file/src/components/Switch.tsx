import { Navigate } from 'react-router-dom'

export const Switch = ({
  children,
  isSucceed,
  fail,
}: {
  isSucceed: boolean
  children: JSX.Element
  fail: string
}) => {
  if (isSucceed) {
    return children
  }

  return <Navigate to={fail} />
}
