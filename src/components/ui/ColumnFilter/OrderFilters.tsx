import { FilterType } from '@/features/users/store/types'
import { CommandItem } from '../command'
import { useEffect } from 'react'

type Props = {
  optionName: string
  filterType: FilterType
  selectedOption: string
  onSelectOption: (option: string) => void
  handleSubmitFilter: () => void
}

const OrderFilters = (props: Props) => {
  const { selectedOption, onSelectOption, handleSubmitFilter } = props

  const handleSelect = (option: string) => {
    onSelectOption(option)
  }
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && selectedOption) {
      handleSubmitFilter()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption])

  return (
    <div>
      <CommandItem onSelect={() => handleSelect('asc')} defaultChecked={selectedOption === 'asc'}>
        Sort ascending
      </CommandItem>
      <CommandItem onSelect={() => handleSelect('desc')} defaultChecked={selectedOption === 'desc'}>
        Sort descending
      </CommandItem>
    </div>
  )
}

export default OrderFilters
