import * as React from 'react'
import { DayPicker, getDefaultClassNames, type DayButton, type Locale } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from 'lucide-react'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'dropdown',
  buttonVariant = 'ghost',
  navLayout = 'around',
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'w-fit rounded-xl border border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-950',
        className
      )}
      captionLayout={captionLayout}
      locale={locale}
      navLayout={navLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString(locale?.code, { month: 'long' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn(
          'flex flex-col h-full sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
          defaultClassNames.months
        ),
        month: cn('grid grid-cols-[auto_1fr_auto] items-center gap-y-4', defaultClassNames.month),
        nav: cn('space-x-1 flex items-center', defaultClassNames.nav),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'col-start-1 h-8 w-8 rounded-lg bg-transparent p-0 opacity-60 hover:opacity-100 hover:bg-neutral-100 dark:hover:bg-neutral-800',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'col-start-3 h-8 w-8 rounded-lg bg-transparent p-0 opacity-60 hover:opacity-100 hover:bg-neutral-100 dark:hover:bg-neutral-800',
          defaultClassNames.button_next
        ),
        month_caption: cn(
          'col-start-2 flex justify-center pt-1 items-center gap-1',
          defaultClassNames.month_caption
        ),
        dropdowns: cn('flex items-center justify-center gap-2', defaultClassNames.dropdowns),
        dropdown_root: cn('relative', defaultClassNames.dropdown_root),
        caption_label: cn('font-semibold select-none text-sm', defaultClassNames.caption_label),
        month_grid: cn('col-span-3 w-full border-collapse space-y-1', defaultClassNames.month_grid),
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'text-neutral-500 rounded-md w-9 font-medium text-xs uppercase tracking-wide dark:text-neutral-400',
          defaultClassNames.weekday
        ),
        week: cn('flex w-full mt-1', defaultClassNames.week),
        week_number_header: cn('w-(--cell-size) select-none', defaultClassNames.week_number_header),
        week_number: cn(
          'text-[0.8rem] text-muted-foreground select-none',
          defaultClassNames.week_number
        ),
        day: cn(
          'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-neutral-100/50 [&:has([aria-selected])]:bg-neutral-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-neutral-800/50 dark:[&:has([aria-selected])]:bg-neutral-800',
          defaultClassNames.day
        ),
        range_start: cn(
          'relative isolate z-0 rounded-l-md bg-muted after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-muted',
          defaultClassNames.range_start
        ),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn(
          'relative isolate z-0 rounded-r-md bg-muted after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-muted',
          defaultClassNames.range_end
        ),
        today: cn(
          'rounded-md bg-neutral-100 font-semibold text-foreground data-[selected=true]:rounded-none dark:bg-neutral-800',
          defaultClassNames.today
        ),
        outside: cn(
          'text-muted-foreground aria-selected:text-muted-foreground',
          defaultClassNames.outside
        ),
        disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return <ChevronLeftIcon className={cn('size-4', className)} {...props} />
          }
          if (orientation === 'right') {
            return <ChevronRightIcon className={cn('size-4', className)} {...props} />
          }
          return <ChevronDownIcon className={cn('size-4', className)} {...props} />
        },
        // Replace the native <select> with a proper shadcn Select
        Dropdown: ({ options, value, onChange }) => {
          const itemRefs = React.useRef<Record<string, HTMLDivElement | null>>({})

          const handleChange = (val: string) => {
            const syntheticEvent = {
              target: { value: val },
            } as React.ChangeEvent<HTMLSelectElement>
            onChange?.(syntheticEvent)
          }

          return (
            <Select
              value={String(value)}
              onValueChange={handleChange}
              onOpenChange={(open) => {
                if (open) {
                  // wait for the portal content to mount before scrolling
                  requestAnimationFrame(() => {
                    itemRefs.current[String(value)]?.scrollIntoView({ block: 'center' })
                  })
                }
              }}
            >
              <SelectTrigger
                size="sm"
                className="h-8 min-w-[92px] rounded-lg border-neutral-200 px-2 text-sm font-medium shadow-none dark:border-neutral-800"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={4} className="z-[100] max-h-64">
                {options?.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={String(option.value)}
                    disabled={option.disabled}
                    ref={(el) => {
                      itemRefs.current[String(option.value)] = el
                    }}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        },
        DayButton: ({ ...props }) => <CalendarDayButton locale={locale} {...props} />,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="size-(--cell-size) flex items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'min-w-(--cell-size) relative isolate z-10 flex aspect-square size-auto w-full flex-col gap-1 rounded-md border-0 font-normal leading-none hover:bg-neutral-100 data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-end=true]:bg-primary data-[range-middle=true]:bg-muted data-[range-start=true]:bg-primary data-[selected-single=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:text-foreground data-[range-start=true]:text-primary-foreground data-[selected-single=true]:text-primary-foreground group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 dark:hover:bg-neutral-800 dark:hover:text-foreground [&>span]:text-xs [&>span]:opacity-70',
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
