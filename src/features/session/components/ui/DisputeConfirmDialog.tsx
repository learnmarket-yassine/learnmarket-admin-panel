import { useId, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

type DisputeConfirmDialogProps = {
  trigger: React.ReactNode
  title: string
  description: string
  confirmLabel: string
  isPending: boolean
  onConfirm: (note: string) => Promise<boolean>
}

const DisputeConfirmDialog = ({
  trigger,
  title,
  description,
  isPending,
  onConfirm,
}: DisputeConfirmDialogProps) => {
  const [open, setOpen] = useState(false)
  const [note, setNote] = useState('')
  const noteId = useId()

  const handleOpenChange = (next: boolean) => {
    if (isPending) return
    setOpen(next)
    if (!next) setNote('')
  }

  const handleConfirm = async () => {
    const succeeded = await onConfirm(note)
    if (succeeded) {
      setOpen(false)
      setNote('')
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="flex min-w-[592px] flex-col space-y-8"
        style={{
          boxShadow: '0px 0px 10px 0px rgba(255, 255, 255, 0.80)',
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#143681]">{title}</DialogTitle>
          <DialogDescription className="text-left">{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-1.5 text-left">
          <label
            htmlFor={noteId}
            className="text-xs font-semibold uppercase tracking-wide text-slate-500"
          >
            Reason for this decision
          </label>
          <textarea
            id={noteId}
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={3}
            maxLength={1000}
            disabled={isPending}
            placeholder="Explain why you're resolving this dispute this way…"
            className="w-full resize-none rounded-2xl border border-[#D1D5DB] bg-white p-2.5 text-sm text-[#111827] focus:outline-none"
          />
        </div>
        <DialogFooter className="!justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            className="h-full whitespace-nowrap rounded-lg px-6 py-3 font-medium text-[#1A46A7] hover:text-[#1A46A7]"
            onClick={() => handleOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="h-full whitespace-nowrap rounded-lg bg-[#2563EB] px-6 py-3 font-semibold text-white hover:bg-[#2563EB]"
            onClick={handleConfirm}
            disabled={isPending || note.trim().length === 0}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DisputeConfirmDialog
