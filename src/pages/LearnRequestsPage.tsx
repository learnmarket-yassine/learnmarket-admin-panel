import { CustomInput } from '@/components/ui/CustomInput'
import { useStore } from '@/store/store'
import { SearchIcon } from '@/assets/Search'
import Stepper from '@/features/learn-request/components/ui/Stepper'

export const LearnRequests = () => {
  const searchWord = useStore((state) => state.learnRequest.searchWord)
  const setSearchWord = useStore((state) => state.learnRequest.setSearchWord)

  return (
    <div className="h-full space-y-5 p-3">
      <Stepper />
      <div className="space-y-10">
        <span className="text-[24px] font-semibold text-[#4C4C4C]">title</span>
      </div>
      <div className="flex gap-4">
        <p className="w-full text-justify text-[#4C4C4C]">description</p>
      </div>
      <div className="h-[75%] space-y-5">
        <div className="h-4/5 w-full rounded border-2 border-x-2 border-dashed border-[#dee2e6] px-2 py-6">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-center px-5 md:justify-end">
              <div className="b relative mb-8 w-auto">
                <div className="flex flex-col gap-4 md:flex-row md:gap-0">
                  <div className="-translate-y-35 pointer-events-none absolute left-6 top-2 z-10 flex -translate-x-1/2 transform items-center">
                    <SearchIcon />
                  </div>
                  <CustomInput
                    id="rechercheInput"
                    label=""
                    className="rounded-lg border-[#E6E6E6] bg-[#FAFAFA] py-2 pl-12 pr-4"
                    placeholder="seach..."
                    value={searchWord}
                    onChange={(e) => {
                      setSearchWord(e.target.value)
                    }}
                    gap="gap-0"
                  />
                </div>
              </div>
            </div>
            {/* <MySites /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
