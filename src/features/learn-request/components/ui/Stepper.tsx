import Step from './Step'

const Stepper = () => {
  const steps = [
    {
      number: 2,
      name: 'Actifs',
      status: 'actif',
    },
    {
      number: 1,
      name: 'Tous',
      status: 'tous',
    },
    {
      number: 3,
      name: 'Inactifs',
      status: 'inactif',
    },
    {
      number: 4,
      name: 'Brouillons/Incomplets',
      status: 'brouillons',
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
