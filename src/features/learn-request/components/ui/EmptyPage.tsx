import { useStore } from '@/store/store'

const EmptyPage = () => {
  const user = useStore((state) => state.auth.user)

  return (
    <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-12 px-20">
      <div className="flex flex-col items-center gap-4">
        <div className="text-text text-center text-4xl font-normal md:text-5xl">
          Bienvenue{' '}
          <span className="font-semibold">
            {user?.firstname} {user?.lastname},
          </span>
        </div>
        <p className="text-1xl text-text text-center md:text-2xl">
          Vous n'avez paramétré aucun <span className="font-semibold">chantier/site</span> pour le
          moment.
        </p>
      </div>
    </div>
  )
}
export default EmptyPage
