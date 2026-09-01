import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import IgnoreImage from '@/assets/IgnoreImage'
import { TutorVerification } from '../../store/types'
import Loader from '@/components/ui/Loader/Loader'

interface TutorVerificationDisapproveModalProps {
  isOpen: boolean
  verification?: TutorVerification
  isLoading?: boolean
  onClose: () => void
  onConfirm: (reason: string) => void | Promise<void>
}

const TutorVerificationDisapproveModal = ({
  isOpen,
  verification,
  isLoading = false,
  onClose,
  onConfirm,
}: TutorVerificationDisapproveModalProps) => {
  const [reason, setReason] = useState('')

  const username = verification
    ? `${verification.user.firstname} ${verification.user.lastname}`
    : ''

  const handleConfirm = async () => {
    if (!reason.trim()) return

    await onConfirm(reason.trim())
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setReason('')
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex justify-center">
            <IgnoreImage />
          </DialogTitle>

          <DialogDescription className="text-[#2C2C2C]">
            <span className="mb-4 block text-center text-2xl font-semibold">
              Disapprove {username}'s tutor verification
            </span>
            <Textarea
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="Enter the reason for disapproval..."
              className="min-h-[120px] resize-none"
              disabled={isLoading}
            />
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex w-full justify-center gap-2">
          <Button
            type="button"
            className="h-full whitespace-nowrap px-6 py-3 font-medium"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="h-full whitespace-nowrap bg-[#2563EB] px-6 py-3 font-medium text-white hover:bg-[#2563EB]"
            onClick={handleConfirm}
            disabled={!reason.trim() || isLoading}
          >
            {isLoading ? <Loader fillColor="#FFFFFF" width="18" height="18" /> : 'Disapprove'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TutorVerificationDisapproveModal
