import { TableCell, TableRow } from '@/components/ui/table'
import { useStore } from '@/store/store'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Loader from '@/components/ui/Loader/Loader'
import { formatDate } from 'date-fns'
import CustomTable from '@/components/ui/CustomTable'
import useGetSparksOffers from '../../hooks/useGetSparksOffers'
import ConfirmModal from '@/components/layout/ConfirmModal'
import useDeleteSparksOffer from '../../hooks/useDeleteSparksOffer'
import ConfirmMessageModal from '@/components/layout/ConfirmMessageModal'
import { SparksOfferForm } from './SparksOfferForm'

const headers = [
  {
    optionName: 'name',
    headerTitle: 'Name',
    filterParams: {
      hideOrder: true,
    },
  },
  {
    optionName: 'amount',
    headerTitle: 'Sparks Amount',
    filterParams: {
      hideOrder: true,
      hideSearch: true,
    },
  },
  {
    optionName: 'price',
    headerTitle: 'Price',
    filterParams: {
      hideOrder: true,
      hideSearch: true,
    },
  },
  {
    optionName: 'createdAt',
    headerTitle: 'Creation Date',
    filterParams: {
      hideSearch: true,
    },
  },
  {
    optionName: 'status',
    headerTitle: 'Status',
    filterParams: {
      hideOrder: true,
      hideSearch: true,
    },
  },
]

const SparksOffersTable = () => {
  const getSparksOffersQuery = useGetSparksOffers()
  const { handleDeleteSparksOffer, handleCloseDeleteModal, deleteModalState, isPending } =
    useDeleteSparksOffer()
  const sparksOffers = useStore((state) => state.sparksOffers.sparksOffers)
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && getSparksOffersQuery.hasNextPage) {
      getSparksOffersQuery.fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, getSparksOffersQuery.hasNextPage, getSparksOffersQuery.fetchNextPage])

  const sparksOffersRows = sparksOffers?.map((sparksOffer) => (
    <TableRow key={sparksOffer?.id}>
      <TableCell className="text-center font-medium">{sparksOffer.name}</TableCell>
      <TableCell className="text-center font-medium">{sparksOffer.sparksAmount}</TableCell>
      <TableCell className="text-center font-medium">{sparksOffer.priceCents / 100}</TableCell>
      <TableCell className="w-36 text-center font-medium">
        {formatDate(sparksOffer.createdAt ?? '', 'dd/MM/yyyy')}
      </TableCell>
      <TableCell className="text-center font-medium">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
            sparksOffer.isActive ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {sparksOffer.isActive ? 'Active' : 'Inactive'}
        </span>
      </TableCell>
      <TableCell className="align-center flex justify-center gap-4 text-end">
        <SparksOfferForm edit={true} id={sparksOffer.id} />
        <>
          <ConfirmModal
            name="Sparks Offer"
            type="delete"
            title={`Delete ${sparksOffer.name} Sparks Offer`}
            description={
              'Are you sure you want to delete this Sparks Offer? This action cannot be undone.'
            }
            handleConfirm={() => handleDeleteSparksOffer(sparksOffer.id)}
            buttonClassName="border-none"
            isLoading={isPending}
          />
          <ConfirmMessageModal
            name="Delete Sparks Offer"
            {...deleteModalState}
            setIsOpen={(open) => !open && handleCloseDeleteModal()}
            isLoading={false}
            handleReturn={handleCloseDeleteModal}
          />
        </>
      </TableCell>
    </TableRow>
  ))

  return (
    <>
      <CustomTable
        headers={headers}
        data={
          <>
            {getSparksOffersQuery.isLoading ? (
              <TableRow>
                <TableCell colSpan={headers.length + 1} className="min-h-full">
                  <Loader className="flex h-full w-full items-center justify-center" />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {sparksOffersRows}
                <TableRow ref={ref}>
                  <TableCell colSpan={headers.length + 1} className="h-full">
                    {getSparksOffersQuery.isFetchingNextPage && (
                      <Loader className="flex w-full items-center justify-center" />
                    )}
                  </TableCell>
                </TableRow>
              </>
            )}
          </>
        }
        filterType="sparksOffers"
        hasData={
          getSparksOffersQuery.isLoading || getSparksOffersQuery?.data?.pages[0]?.totalCount !== 0
        }
      />
    </>
  )
}

export default SparksOffersTable
