import { memo, useCallback, useMemo } from 'react'
import SearchInput from './SearchInput'
import OptionsList from './OptionList'
import { FilterType } from '@/features/users/store/types'
import useInitialOptions from './hooks/useInitialOptions'
import { useFilterOptions } from './hooks/useFilterOptions'

type ColumnOptionsProps = {
  optionName: string
  filterType: FilterType
  defaultKeyword: string
  setKeyword: (keyword: string) => void
  selectedRadio: string
  onSelectRadio: (option: string) => void
  onKeyDown: (event: React.KeyboardEvent) => void
}

const ColumnOptions = memo((props: ColumnOptionsProps) => {
  const {
    filterType,
    optionName,
    selectedRadio,
    onSelectRadio,
    setKeyword,
    defaultKeyword,
    onKeyDown,
  } = props
  const { initialOptions } = useInitialOptions(filterType, optionName)
  const { filteredOptions, handleSearch, clearSearch } = useFilterOptions(initialOptions)

  const handleKeywordChange = useCallback(
    (value: string) => {
      handleSearch(value)
      setKeyword(value)
    },
    [handleSearch, setKeyword]
  )

  const handleClearSearch = useCallback(() => {
    clearSearch()
    setKeyword('')
  }, [clearSearch, setKeyword])

  const showSearchBar = useMemo(
    () =>
      (filterType === 'user' && optionName === 'username') ||
      (filterType === 'tutorVerifications' && optionName === 'username') ||
      initialOptions.length > 0,
    [filterType, optionName, initialOptions.length]
  )

  return (
    <div className="space-y-3" onKeyDown={onKeyDown}>
      <span className="block font-semibold">Filter by value</span>
      {showSearchBar && (
        <SearchInput
          value={defaultKeyword}
          onChange={handleKeywordChange}
          onClear={handleClearSearch}
        />
      )}
      <OptionsList
        options={filteredOptions}
        selectedValue={selectedRadio}
        onSelect={onSelectRadio}
      />
    </div>
  )
})

ColumnOptions.displayName = 'ColumnOptions'

export default ColumnOptions
