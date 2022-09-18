import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { CaretDown, Check, GameController } from 'phosphor-react'
import { Input } from './Input'
import { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'

interface Game {
  id: string
  title: string
}

export const CreateAdModal = () => {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [selectedGame, setSelectedGame] = useState('')
  const [useVoiceChanel, setUseVoiceChanel] = useState(false)

  const handleCreateAd = async (event: FormEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    try {
      await axios.post(`http://10.0.0.227:3000/games/${selectedGame}/ads`, {
        name: data.name,
        yearsPlaing: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays,
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChanel,
      })

      alert('Anúncio criado com sucesso!')
    } catch (e) {
      alert(e)
    }
  }

  useEffect(() => {
    axios('http://localhost:3000/games').then((response) =>
      setGames(response.data),
    )
  }, [])

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg max-w-[488px] w-full shadow-lg shadow-black/30">
        <Dialog.Title className="font-black text-4xl">
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <Select.Root onValueChange={setSelectedGame}>
              <Select.Trigger className="bg-zinc-900 py-3 px-4 relative rounded text-sm text-zinc-500 flex justify-between items-center dataPlaceholder:text-violet-600">
                <Select.Value placeholder="Selecione o game que deseja jogar" />
                <Select.Icon>
                  <CaretDown />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal className="">
                <Select.Content className="overflow-hidden rounded-md bg-zinc-800 max-w-[408px]">
                  <Select.Viewport>
                    <Select.Group>
                      <Select.Label className="flex items-center justify-center text-lg py-2 text-zinc-700 font-semibold bg-zinc-400">
                        Selecione o game que deseja jogar
                      </Select.Label>
                      {games.map((game) => {
                        return (
                          <Select.Item
                            key={game.id}
                            value={game.id}
                            className="selectHover:bg-zinc-400 pl-6 py-3 relative text-white flex items-center gap-3 selectHover:rounded-md selectHover:cursor-pointer selectHover:text-zinc-900"
                          >
                            <Select.ItemText>{game.title}</Select.ItemText>
                            <Select.ItemIndicator className="absolute left-1 inline-flex items-center justify-center">
                              <Check />
                            </Select.ItemIndicator>
                          </Select.Item>
                        )
                      })}
                    </Select.Group>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              name="name"
              type="text"
              placeholder="Como te chamam dentro do game?"
              id="name"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                name="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser ZERO"
                id="yearsPlaying"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input
                name="discord"
                type="text"
                placeholder="Usuario#0000"
                id="discord"
              />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ToggleGroup.Root
                type="multiple"
                className="grid md:grid-cols-4 grid-cols-5 gap-1"
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  title="Domingo"
                  className="w-10 h-10 bg-zinc-900 rounded text-sm toggleOn:bg-violet-500"
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  title="Segunda"
                  className="w-10 h-10 bg-zinc-900 rounded text-sm toggleOn:bg-violet-500"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  title="Terça"
                  className="w-10 h-10 bg-zinc-900 rounded text-sm toggleOn:bg-violet-500"
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  title="Quarta"
                  className="w-10 h-10 bg-zinc-900 rounded text-sm toggleOn:bg-violet-500"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  title="Quinta"
                  className="w-10 h-10 bg-zinc-900 rounded text-sm toggleOn:bg-violet-500"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  title="Sexta"
                  className="w-10 h-10 bg-zinc-900 rounded text-sm toggleOn:bg-violet-500"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  title="Sábado"
                  className="w-10 h-10 bg-zinc-900 rounded text-sm toggleOn:bg-violet-500"
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  name="hourStart"
                  type="time"
                  placeholder="De"
                  id="hourStart"
                />
                <Input
                  name="hourEnd"
                  type="time"
                  placeholder="Até"
                  id="hourEnd"
                />
              </div>
            </div>
          </div>
          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChanel(true)
                } else {
                  setUseVoiceChanel(false)
                }
              }}
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check size={16} className="text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>
          <footer className="mt-4 flex gap-4 justify-end">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>
            <button
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
              type="submit"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
