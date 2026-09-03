import { TableCell, TableRow } from '@/components/ui/table'
import { useStore } from '@/store/store'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Loader from '@/components/ui/Loader/Loader'
import { formatDate } from 'date-fns'
import CustomTable from '@/components/ui/CustomTable'
import ViewIcon from '@/assets/ViewIcon'
import useGetTutorVerifications from '../../hooks/useGetTutorVerifications'
import Like from '@/assets/Like'
import Dislike from '@/assets/Dislike'
import { TutorVerification } from '../../store/types'
import ConfirmModal from '@/components/layout/ConfirmModal'
import useApproveTutorVerification from '../../hooks/useApproveTutorVerification'
import useDisapproveTutorVerification from '../../hooks/useDisapproveTutorVerification'
import ViewTutorVerificationInfo from './ViewTutorVerificationInfo'
import { SquareArrowOutUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import TutorVerificationDisapproveModal from './TutorVerificationDisapproveModal'
import { useNavigate } from 'react-router-dom'

export type VerificationAction = 'approve' | 'disapprove'

export type ModalState = {
  isOpen: boolean
  id?: string
  verificationData?: TutorVerification
}

const headers = [
  {
    optionName: 'see',
    headerTitle: 'Views',
    filterParams: {
      hideOrder: true,
      hideSearch: true,
    },
  },
  {
    optionName: 'username',
    headerTitle: 'Username',
    filterParams: {
      hideOrder: true,
    },
  },
  {
    optionName: 'email',
    headerTitle: 'Email',
    filterParams: {
      hideOrder: true,
      hideSearch: true,
    },
  },
  {
    optionName: 'submittedAt',
    headerTitle: 'Submission Date',
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

const TutorVerificationsTable = () => {
  const [openApproveModal, setOpenApproveModal] = useState<ModalState>({ isOpen: false })
  const [openDisapproveModal, setOpenDisapproveModal] = useState<ModalState>({ isOpen: false })
  const getTutorVerificationsQuery = useGetTutorVerifications()
  const tutorVerifications = useStore((state) => state.tutorVerifications.tutorVerifications)
  const navigate = useNavigate()
  const { ref, inView } = useInView()

  const { mutateAsync: approveTutorVerification, isPending: isApprovalPending } =
    useApproveTutorVerification()

  const { mutateAsync: disapproveTutorVerification, isPending: isDisapprovalPending } =
    useDisapproveTutorVerification()

  useEffect(() => {
    if (inView && getTutorVerificationsQuery.hasNextPage) {
      getTutorVerificationsQuery.fetchNextPage()
    }
  }, [inView, getTutorVerificationsQuery.hasNextPage, getTutorVerificationsQuery.fetchNextPage])

  const buttons = [
    {
      icon: <Like color="#50CD89" />,
      tooltip: 'Approve this tutor verification',
      id: 'approve' as VerificationAction,
      className: 'btnLike',
    },
    {
      icon: <Dislike color="#DD0000" />,
      tooltip: 'Disapprove this tutor verification',
      id: 'disapprove' as VerificationAction,
      className: 'btnDislike',
    },
  ]

  const handleClick = (id: string, action: VerificationAction, verification: TutorVerification) => {
    if (action === 'approve') {
      setOpenApproveModal({ isOpen: true, id, verificationData: verification })
      return
    }
    setOpenDisapproveModal({ isOpen: true, id, verificationData: verification })
  }

  const handleCloseApproveModal = () => {
    setOpenApproveModal({
      isOpen: false,
    })
  }

  const handleCloseDisapproveModal = () => {
    setOpenDisapproveModal({ isOpen: false })
  }

  const handleApprove = async () => {
    if (!openApproveModal.id) return
    await approveTutorVerification(openApproveModal.id)
    handleCloseApproveModal()
  }

  const handleDisapprove = async (reason: string) => {
    if (!openDisapproveModal.id) return
    await disapproveTutorVerification({ id: openDisapproveModal.id, reason })
    handleCloseDisapproveModal()
  }

  const approveUsername = openApproveModal.verificationData
    ? `${openApproveModal.verificationData.user.firstname} ${openApproveModal.verificationData.user.lastname}`
    : ''

  const tutorVerificationsRows = tutorVerifications?.map((verification) => (
    <TableRow key={verification.id}>
      <TableCell className="flex items-center justify-center font-medium">
        <ViewTutorVerificationInfo
          showingComponent={<ViewIcon />}
          tutorVerificationData={{ data: verification, isLoading: false }}
        />
      </TableCell>

      <TableCell className="text-center font-medium">
        {verification.user.firstname} {verification.user.lastname}
      </TableCell>

      <TableCell className="text-center font-medium">{verification.user.email}</TableCell>

      <TableCell className="w-36 text-center font-medium">
        {formatDate(verification.submittedAt ?? '', 'dd/MM/yyyy')}
      </TableCell>

      <TableCell className="text-center font-medium">
        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
          {verification.verificationStatus}
        </span>
      </TableCell>

      <TableCell className="flex items-center justify-center gap-1.5 space-x-2 text-center font-medium">
        {buttons.map((button) => (
          <div key={`${verification.id}-${button.id}`}>
            <Button onClick={() => handleClick(verification.id, button.id, verification)}>
              {button.icon}
            </Button>
          </div>
        ))}
        <Button onClick={() => navigate(`/users/${verification.user.id}`)}>
          <SquareArrowOutUpRight />
        </Button>
      </TableCell>
    </TableRow>
  ))

  return (
    <>
      <CustomTable
        headers={headers}
        data={
          <>
            {getTutorVerificationsQuery.isLoading ? (
              <TableRow>
                <TableCell colSpan={headers.length + 1} className="min-h-full">
                  <Loader className="flex h-full w-full items-center justify-center" />
                </TableCell>
              </TableRow>
            ) : (
              <>
                <ConfirmModal
                  type={'active'}
                  name="Tutor Verification"
                  confirmButtonText={'Approve'}
                  title={`Approve ${approveUsername}'s tutor verification`}
                  description={`Are you sure you want to approve ${approveUsername}'s tutor verification? This will allow the tutor to become verified on the platform.`}
                  isOpen={openApproveModal.isOpen}
                  setIsOpen={() => handleCloseApproveModal()}
                  handleConfirm={handleApprove}
                  handleClickCancel={handleCloseApproveModal}
                  isLoading={isApprovalPending}
                />
                <TutorVerificationDisapproveModal
                  isOpen={openDisapproveModal.isOpen}
                  verification={openDisapproveModal.verificationData}
                  isLoading={isDisapprovalPending}
                  onClose={handleCloseDisapproveModal}
                  onConfirm={handleDisapprove}
                />
                {tutorVerificationsRows}

                <TableRow ref={ref}>
                  <TableCell colSpan={headers.length + 1} className="h-full">
                    {getTutorVerificationsQuery.isFetchingNextPage && (
                      <Loader className="flex w-full items-center justify-center" />
                    )}
                  </TableCell>
                </TableRow>
              </>
            )}
          </>
        }
        filterType="tutorVerifications"
        hasData={
          getTutorVerificationsQuery.isLoading ||
          getTutorVerificationsQuery.data?.pages[0]?.totalCount !== 0
        }
      />
    </>
  )
}

export default TutorVerificationsTable
