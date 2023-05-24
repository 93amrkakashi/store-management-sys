import Image from 'next/image'
import { Inter } from 'next/font/google'
import SignUp from '@/components/SignUp'
import SignIn from '@/components/SignIn'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <SignIn />
    </div>
  )
}
