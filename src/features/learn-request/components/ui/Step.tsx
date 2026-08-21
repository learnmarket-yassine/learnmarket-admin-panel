import { cn } from '@/lib/utils'
import { useStore } from '@/store/store'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

type Props = {
  stepNumber: number
  stepName: string
  stepStatus?: string | undefined
}

const Step = (props: Props) => {
  const formStep = useStore((state) => state.learnRequest.formStep)
  const setFormStep = useStore((state) => state.learnRequest.setFormStep)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const urlStatus = searchParams.get('status')
    if (!urlStatus) {
      setSearchParams({ status: 'tous' })
    } else if (urlStatus === props.stepStatus) {
      setFormStep(props.stepNumber as 1 | 2 | 3 | 4)
    }
  }, [searchParams, setSearchParams, setFormStep, props.stepNumber, props.stepStatus])

  const changeFormStep = () => {
    setFormStep(props.stepNumber as 1 | 2 | 3 | 4)
    if (props.stepStatus) {
      setSearchParams({ status: props.stepStatus })
    }
  }

  return (
    <button
      onClick={changeFormStep}
      className={cn(
        'text-nav relative flex min-h-[45px] min-w-[150px] items-center justify-center gap-2 rounded-lg p-3 transition-colors',
        formStep === props.stepNumber ? 'bg-[#2563EB] text-white' : 'bg-white text-primary'
      )}
    >
      <span>{props.stepName}</span>
    </button>
  )
}

export default Step
