import { Command, CommandGroup, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Button } from '../button'
import { useStore } from '@/store/store'
import { useEffect, useState } from 'react'
import OrderFilters from './OrderFilters'
import ColumnOptions from './ColumnOptions/ColumnOptions'
import ArrowDownIcon from '@/assets/ArrowDownIcon'
import { FilterType, TableFilter } from '@/features/users/store/types'
import { customFilters, customOrders } from './CustomFilters'

type Props = {
  optionName: string
  filterType: FilterType
  filterParams?: {
    hideOrder?: boolean
    hideSearch?: boolean
    hideDate?: boolean
  }
}

const ColumnFilter = (props: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={cn('flex items-center gap-3 p-2')}>
          <ArrowDownIcon />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-64 text-black"
        style={{
          boxShadow: '0px 2.256px 27.067px 0px rgba(0, 0, 0, 0.10)',
        }}
        align="end"
      >
        <Filters
          filterType={props.filterType}
          filterParams={props.filterParams}
          optionName={props.optionName}
          setShowFilter={setOpen}
        />
      </PopoverContent>
    </Popover>
  )
}

type TProps = {
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>
  optionName: string
  filterType: FilterType
  filterParams?: {
    hideOrder?: boolean
    hideSearch?: boolean
    hideDate?: boolean
  }
}

const Filters = ({
  filterType,
  optionName,
  filterParams = { hideDate: true },
  setShowFilter,
}: TProps) => {
  const filters = useStore((state) => state.users.tableFilters).user
  const setFilters = useStore((state) => state.users.setTableFilters)
  const [selectedOrder, setSelectedOrder] = useState<string>('')
  const [selectedRadio, setSelectedRadio] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('')

  const handleSubmitFilter = () => {
    if (!setFilters) return

    const newFilters: TableFilter[] = [
      ...(selectedOrder
        ? [
            {
              optionName: optionName || '',
              filterKey: 'order' as const,
              filterValue: selectedOrder,
            },
          ]
        : []),
      ...(selectedRadio
        ? [
            {
              optionName: optionName || '',
              filterKey: 'radio' as const,
              filterValue: selectedRadio,
            },
          ]
        : []),
      ...(keyword.trim()
        ? [{ optionName: optionName || '', filterKey: 'keyword' as const, filterValue: keyword }]
        : []),
    ]
    applyCustomFilters(newFilters)
    applyCustomOrders(newFilters)

    setFilters(filterType, [
      ...filters.filter((filter) => filter.optionName !== optionName),
      ...newFilters,
    ])

    setShowFilter(false)
  }

  const applyCustomFilters = (newFilters: TableFilter[]) => {
    newFilters.forEach((filter) => {
      const filterFunction = customFilters[filterType]?.filters[filter.optionName]
      if (filterFunction && (filter.filterKey === 'radio' || filter.filterKey === 'keyword')) {
        filter.customFilter = filterFunction(filter.filterValue)
      }
    })
  }

  const applyCustomOrders = (filters: TableFilter[]) => {
    filters.forEach((filter) => {
      const filterFunction = customOrders[filterType]?.filters[filter.optionName]
      if (filterFunction && filter.filterKey === 'order') {
        filter.customOrder = filterFunction(filter.filterValue)
      }
    })
  }

  const handleClearFilter = () => {
    if (typeof setFilters === 'function') {
      const updatedFilters = filters.filter((filter) => filter.optionName !== optionName)
      setFilters(filterType, updatedFilters)
    }
    setShowFilter(false)
  }

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === 'Enter') {
      handleSubmitFilter()
    }
  }

  useEffect(() => {
    filters
      .filter((filter) => filter.optionName === optionName)
      .forEach((filter) => {
        if (filter.filterKey === 'order') setSelectedOrder(filter.filterValue)
        else if (filter.filterKey === 'radio') setSelectedRadio(filter.filterValue)
        else if (filter.filterKey === 'keyword') setKeyword(filter.filterValue)
      })
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, optionName])

  return (
    <div>
      {!filterParams?.hideOrder && (
        <>
          <Command>
            <CommandList>
              <CommandGroup>
                <OrderFilters
                  filterType={filterType}
                  optionName={optionName}
                  selectedOption={selectedOrder}
                  onSelectOption={setSelectedOrder}
                  handleSubmitFilter={handleSubmitFilter}
                />
              </CommandGroup>
            </CommandList>
          </Command>
          {!filterParams?.hideSearch && <hr />}
        </>
      )}

      {!filterParams?.hideSearch && (
        <div className="space-y-4">
          <ColumnOptions
            filterType={filterType}
            optionName={optionName}
            defaultKeyword={keyword}
            setKeyword={setKeyword}
            selectedRadio={selectedRadio}
            onSelectRadio={setSelectedRadio}
            onKeyDown={handleKeyDown}
          />
        </div>
      )}

      <div className="flex w-full items-center gap-1 pt-3">
        <Button
          type="button"
          className="h-full w-1/2 whitespace-nowrap py-2 font-medium"
          onClick={handleClearFilter}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="h-full w-1/2 whitespace-nowrap bg-[#2563EB] py-2 font-medium text-white hover:bg-[#2563EB]"
          onClick={handleSubmitFilter}
        >
          OK
        </Button>
      </div>
    </div>
  )
}

export default ColumnFilter
