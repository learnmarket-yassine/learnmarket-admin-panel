import SaveImage from '@/assets/SaveImage'
import TrashImage from '@/assets/TrashImage'
import { Button } from '@/components/ui/button'
import Loader from '@/components/ui/Loader/Loader'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { MouseEventHandler } from 'react'

type Props = {
  name: string
  title: string | React.ReactNode
  type: 'success' | 'delete' | 'error'
  description: string
  titleButton?: string
  descriptionStyles?: string
  handleReturn?: MouseEventHandler<HTMLButtonElement>
  handleClose?: MouseEventHandler<HTMLButtonElement>
  isLoading?: boolean
  isOpen?: boolean
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const SuccessMessageModal = (props: Props) => {
  if (!props.isOpen) return null

  return (
    <Dialog open={props.isOpen} onOpenChange={props.setIsOpen} key={props.description}>
      <DialogContent className="flex max-w-[300px] flex-wrap justify-center py-[2rem] sm:max-w-[335px] lg:max-h-[650px] lg:max-w-[350px]">
        <DialogHeader>
          <DialogTitle className="flex justify-center">
            {props.type === 'delete' ? <TrashImage /> : <SaveImage />}
          </DialogTitle>
          <DialogDescription className="flex flex-col flex-wrap justify-center gap-4 text-[#2C2C2C]">
            <div className="text-center text-3xl font-semibold">{props.title}</div>
            <div className={`text-center ${props.descriptionStyles || ''}`}>
              {props.description}
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="w-full justify-center gap-2">
          {!props.isLoading ? (
            props.type === 'delete' ? (
              <>
                <Button
                  type="button"
                  className="w-1/2"
                  variant="outline"
                  onClick={props.handleReturn}
                >
                  cancel
                </Button>
                <Button
                  type="button"
                  className="h-full w-1/2 whitespace-nowrap bg-[#2563EB] px-6 py-3 font-medium text-white hover:bg-[#2563EB]"
                  onClick={props.handleClose}
                >
                  Confirm
                </Button>
              </>
            ) : (
              <Button
                type="button"
                className="h-full w-full whitespace-nowrap bg-[#2563EB] px-6 py-3 font-medium text-white hover:bg-[#2563EB]"
                variant={props.type !== 'error' ? 'default' : 'outline'}
                onClick={props.handleReturn}
              >
                {props?.titleButton ?? 'Return'}
              </Button>
            )
          ) : (
            <Loader width="40" height="35" />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SuccessMessageModal
