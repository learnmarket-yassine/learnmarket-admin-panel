import BackButton from '@/components/ui/BackButton'
import { SparksOfferForm } from '@/features/sparks/components/ui/SparksOfferForm'
import SparksOffersTable from '@/features/sparks/components/ui/SparksOffersTable'

const SparksOffersPage = () => {
  return (
    <div
      className="h-full space-y-7 p-4"
      style={{
        maxHeight: `calc(100% - 100px)`,
      }}
    >
      <div className="space-y-3">
        <BackButton text={'Back'} className="text-xl text-primary" route={`/learn-requests`} />
        <p>
          Here you can manage Sparks offers on the platform, configure spark amounts and pricing,
          and ensure a clear and consistent experience for tutors.
        </p>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-end">
          <SparksOfferForm edit={false} />
        </div>
        <SparksOffersTable />
      </div>
    </div>
  )
}

export default SparksOffersPage
