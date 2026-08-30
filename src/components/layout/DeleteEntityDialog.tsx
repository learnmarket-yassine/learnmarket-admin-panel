import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Loader from '@/components/ui/Loader/Loader'

interface DeleteEntityDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  entityLabel: string
  entityName: string
  isActive: boolean
  cascadeWarning: string
  onDeactivate: () => void
  onHardDelete: () => void
  isDeactivating: boolean
  isDeleting: boolean
}

const DeleteEntityDialog = ({
  open,
  onOpenChange,
  entityLabel,
  entityName,
  isActive,
  cascadeWarning,
  onDeactivate,
  onHardDelete,
  isDeactivating,
  isDeleting,
}: DeleteEntityDialogProps) => {
  const isBusy = isDeactivating || isDeleting

  return (
    <Dialog open={open} onOpenChange={(next) => !isBusy && onOpenChange(next)}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete this {entityLabel}?</DialogTitle>
          <DialogDescription>
            <span className="block font-medium text-foreground">{entityName}</span>
            <span className="mt-2 block">{cascadeWarning}</span>
            {isActive && (
              <span className="mt-2 block">
                If this {entityLabel} may still be in use, deactivating hides it everywhere new
                selections happen without removing existing data.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
          {isActive && (
            <Button
              type="button"
              className="w-full"
              variant="default"
              disabled={isBusy}
              onClick={onDeactivate}
            >
              {isDeactivating ? (
                <Loader fillColor="#FFFFFF" width="18" height="18" />
              ) : (
                `Deactivate ${entityLabel}`
              )}
            </Button>
          )}
          <Button
            type="button"
            className="w-full"
            variant="destructive"
            disabled={isBusy}
            onClick={onHardDelete}
          >
            {isDeleting ? (
              <Loader fillColor="currentColor" width="18" height="18" />
            ) : (
              `Delete permanently`
            )}
          </Button>
          <Button
            type="button"
            className="w-full"
            variant="ghost"
            disabled={isBusy}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteEntityDialog
