import { Button } from '@/components/ui/button'
import Loader from '@/components/ui/Loader/Loader'
import { CustomInput } from '@/components/ui/CustomInput'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { updatePlatformSettingsSchema } from '../../schema/schema'
import { useEditPlatformSettings } from '../../hooks/useEditPlatformSettings'
import { useEffect } from 'react'

type FormValues = z.infer<typeof updatePlatformSettingsSchema>

type PlatformSettingsFormProps = {
  data?: FormValues
  isLoading?: boolean
}

const PlatformSettingsForm = ({ data, isLoading }: PlatformSettingsFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(updatePlatformSettingsSchema),
    defaultValues: {
      proposalSparksCost: data?.proposalSparksCost ?? 0,
      serviceFeePercent: data?.serviceFeePercent ?? 0,
    },
  })

  useEffect(() => {
    if (data) {
      reset({
        proposalSparksCost: data.proposalSparksCost,
        serviceFeePercent: data.serviceFeePercent,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const { handleEditPlatformSettings, isLoading: isEditing } = useEditPlatformSettings()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await handleEditPlatformSettings({
      proposalSparksCost: data.proposalSparksCost,
      serviceFeePercent: data.serviceFeePercent,
    })
  }

  if (isLoading) {
    return <Loader className="flex h-full w-full items-center justify-center" />
  }

  return (
    <form className="flex h-full min-h-0 flex-col" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Form content */}
      <div className="flex-1 space-y-5">
        {/* Proposal Sparks Cost */}
        <div className="space-y-2">
          <Label htmlFor="proposal-sparks-cost" className="text-label text-base font-[600]">
            Proposal Sparks Cost
          </Label>

          <CustomInput
            id="proposal-sparks-cost"
            type="number"
            required={false}
            placeholder="0"
            error={errors.proposalSparksCost?.message}
            {...register('proposalSparksCost', {
              valueAsNumber: true,
            })}
          />
        </div>

        {/* Service Fee */}
        <div className="space-y-2">
          <Label htmlFor="service-fee-percent" className="text-label text-base font-[600]">
            Service Fee (%)
          </Label>

          <CustomInput
            id="service-fee-percent"
            type="number"
            required={false}
            placeholder="10"
            step="0.01"
            min="0"
            max="100"
            error={errors.serviceFeePercent?.message}
            {...register('serviceFeePercent', {
              valueAsNumber: true,
            })}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto flex justify-end gap-2 pt-6">
        <Button
          type="button"
          className="h-full whitespace-nowrap px-6 py-3 font-medium"
          disabled={isEditing || isLoading}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="h-full whitespace-nowrap bg-[#2563EB] px-6 py-3 font-medium text-white hover:bg-[#2563EB]"
          disabled={isEditing || isLoading}
        >
          {isEditing ? <Loader fillColor="#FFFFFF" width="25" height="25" /> : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}

export default PlatformSettingsForm
