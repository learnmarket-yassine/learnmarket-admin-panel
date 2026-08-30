import { Checkbox } from '@/components/ui/checkbox'
import { Skill } from '../types'

interface SkillCheckboxOptionProps {
  skill: Skill
  checked: boolean
  disabled?: boolean
  onToggle: (skill: Skill) => void
}

function SkillCheckboxOption({ skill, checked, disabled, onToggle }: SkillCheckboxOptionProps) {
  return (
    <li>
      <label
        className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-semibold text-[#143681] ${
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }`}
      >
        <Checkbox checked={checked} disabled={disabled} onCheckedChange={() => onToggle(skill)} />
        {skill.name}
      </label>
    </li>
  )
}

export default SkillCheckboxOption
