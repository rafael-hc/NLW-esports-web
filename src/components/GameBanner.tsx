interface GameBannerProps {
  title: string
  bannerUrl: string
  ads: number
}

export const GameBanner = ({ title, bannerUrl, ads }: GameBannerProps) => {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={bannerUrl} alt="" />
      <footer className="w-full pt-16 pb-4 px-4 bg-game-gradiente absolute bottom-0 left-0 right-0">
        <strong className="text-white font-bold block">{title}</strong>
        <span className="text-zinc-300 text-sm block">
          {ads === 1 ? `${ads} anúncio` : `${ads} anúncios`}
        </span>
      </footer>
    </a>
  )
}
