type LearnRequestState = {
  clickedLearnRequestName: string
  setClickedLearnRequestName: (learnRequest: string) => void
  searchWord: string
  setSearchWord: (searchWord: string) => void
  formStep: number
  setFormStep: (step: number) => void
}
export type LearnRequestSlice = {
  learnRequest: LearnRequestState
}
