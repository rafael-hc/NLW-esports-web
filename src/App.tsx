import { GameBanner } from './components/GameBanner'
import { useEffect, useState } from 'react'
import { CreateAdModal } from './components/form/CreateAdModal'
import { CreateAdBanner } from './components/CreateAdBanner'
import * as Dialog from '@radix-ui/react-dialog'
import axios from 'axios'

import './styles/main.css'
import Logo from './assets/logo-nlw-esports.svg'

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

export function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://10.0.0.227:3000/games').then((response) =>
      setGames(response.data),
    )
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col mt-20 mb-10 md:p-0 p-2">
      <img src={Logo} alt="" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{' '}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{' '}
        está aqui.
      </h1>

      <div className="grid md:grid-cols-6 grid-cols-2 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              ads={game._count.ads}
              bannerUrl={game.bannerUrl}
              title={game.title}
            />
          )
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}
