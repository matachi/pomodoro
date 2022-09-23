import { ReactNode } from 'react'
import Link from 'next/link'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">Pomodoro timer</li>
            <li><Link href="/"><a>Home</a></Link></li>
            <li><Link href="/settings"><a>Settings</a></Link></li>
          </ul>
        </div>
      </div>

      <main>{children}</main>

      <footer />
    </>
  )
}