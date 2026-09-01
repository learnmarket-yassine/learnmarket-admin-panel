import { memo } from 'react'
import { Label } from '../../label'
import { OptionsListProps } from './types'
import { RadioGroup, RadioGroupItem } from '../../radio-group'

const OptionsList = memo(({ options, selectedValue, onSelect }: OptionsListProps) => {
  return (
    <RadioGroup
      defaultValue="None"
      className="flex max-h-48 flex-col gap-4 overflow-y-auto"
      value={selectedValue}
      onValueChange={onSelect}
    >
      {options.map((option) => (
        <div className="flex items-center space-x-2" key={option.id}>
          <RadioGroupItem value={option.value} id={option.value} />
          <Label htmlFor={option.value}>{option.name}</Label>
        </div>
      ))}
    </RadioGroup>
  )
})

OptionsList.displayName = 'OptionsList'

export default OptionsList
