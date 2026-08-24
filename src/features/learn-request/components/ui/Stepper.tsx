import Step from './Step'

const Stepper = () => {
  const steps = [
    {
      number: 1,
      name: 'In Progress',
      status: 'In_Progress',
    },
    {
      number: 2,
      name: 'Completed',
      status: 'completed',
    },
    {
      number: 3,
      name: 'All',
      status: 'all',
    },
    {
      number: 4,
      name: 'Draft',
      status: 'drafts',
    },
  ]

  return (
    <div className="flex h-20 w-full items-center justify-around rounded-lg border border-[#F2F2F2] bg-white">
      {steps.map((step) => {
        return (
          <Step
            key={step.number}
            stepName={step.name}
            stepNumber={step.number}
            stepStatus={step.status}
          />
        )
      })}
    </div>
  )
}

export default Stepper
