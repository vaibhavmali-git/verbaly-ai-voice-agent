import React from 'react'
import Logo from './logo'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/custom/button'

const Header = () => {
  return (
    <header className='h-16 w-full border-b-2 border-border px-4'>
        <div className='flex h-full items-center justify-between lg:max-w-5xl mx-auto'>
            <Logo />

            <div className='flex gap-x-3 items-center'>
                <ThemeToggle />
                <Button variant="outline" size="sm">Login</Button>
                <Button size="sm">Sign Up</Button>
            </div>
        </div>
    </header>
  )
}

export default Header