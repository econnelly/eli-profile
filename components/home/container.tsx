import { ReactNode, FunctionComponent } from 'react'

type Props = {
  children?: ReactNode
}

const Container = ({ children }: Props) => {
  return <div className="container mx-auto flex flex-wrap py-6">{children}</div>
}

export default Container
