import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { CustomInput } from '@/components/ui/CustomInput'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Loader from '@/components/ui/Loader/Loader'
import ToastMessage from '@/components/layout/ToastMessage'
import { getApiErrorMessage, isConflictError } from '@/lib/api/errors'
import { skillSchema, SkillFormValues } from '../schemas'
import { SkillWithCounts } from '../types'
import useCreateSkill from '../hooks/useCreateSkill'
import useUpdateSkill from '../hooks/useUpdateSkill'
import { useEffect } from 'react'

interface SkillFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  skill?: SkillWithCounts
  existingSkills: SkillWithCounts[]
}

const SkillFormModal = ({ open, onOpenChange, skill, existingSkills }: SkillFormModalProps) => {
  const isEditing = !!skill
  const createSkill = useCreateSkill()
  const updateSkill = useUpdateSkill()
  const isPending = createSkill.isPending || updateSkill.isPending

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: skill?.name ?? '',
    },
  })
  const { register, handleSubmit, setError, formState, reset } = form
  const { errors } = formState

  useEffect(() => {
    if (skill) {
      reset({
        name: skill.name,
      })
    } else {
      reset({
        name: '',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skill])

  const onSubmit = async (values: SkillFormValues) => {
    if (isPending) return

    const name = values.name.trim()
    const conflict = existingSkills.find(
      (s) => s.id !== skill?.id && s.name.toLowerCase() === name.toLowerCase()
    )
    if (conflict) {
      setError('name', { message: 'A skill with this name already exists' })
      return
    }

    try {
      if (isEditing) {
        await updateSkill.mutateAsync({
          id: skill.id,
          payload: { name, isActive: values.isActive },
        })
        ToastMessage({ type: 'success', message: 'Skill updated' })
      } else {
        await createSkill.mutateAsync({ name })
        ToastMessage({ type: 'success', message: 'Skill created' })
      }
      onOpenChange(false)
    } catch (error) {
      if (isConflictError(error)) {
        setError('name', { message: getApiErrorMessage(error) })
        return
      }
      ToastMessage({ type: 'error', message: getApiErrorMessage(error) })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex w-[400px] flex-col space-y-6 sm:w-[425px] sm:min-w-[600px]"
        style={{
          boxShadow: '0px 0px 10px 0px rgba(255, 255, 255, 0.80)',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#143681]">
              {isEditing ? 'Edit skill' : 'New skill'}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-4">
            <CustomInput
              label="Name"
              required
              width="w-full"
              className="border border-[#6B7280] bg-white"
              error={errors.name?.message}
              {...register('name')}
            />
          </div>
          <DialogFooter className="!justify-end">
            <Button
              type="button"
              className="h-full whitespace-nowrap px-6 py-3 font-medium"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-full whitespace-nowrap bg-[#2563EB] px-6 py-3 font-medium text-white hover:bg-[#2563EB]"
              disabled={isPending}
            >
              {isPending ? <Loader fillColor="#FFFFFF" width="18" height="18" /> : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SkillFormModal
