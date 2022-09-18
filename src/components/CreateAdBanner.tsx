import * as Dialog from '@radix-ui/react-dialog'
import { MagnifyingGlassPlus } from 'phosphor-react'

export const CreateAdBanner = () => {
  return (
    <div className="bg-nlw-gradient pt-1 self-stretch mt-8 rounded-lg overflow-hidden">
      <div className="bg-[#2A2634] py-6 px-8 flex justify-between items-center">
        <div>
          <strong className="block text-2xl text-white font-black">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400 block">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>
        <Dialog.Trigger className="flex items-center gap-3 px-4 py-3 bg-violet-500 hover:bg-violet-600 rounded text-white">
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  )
}
