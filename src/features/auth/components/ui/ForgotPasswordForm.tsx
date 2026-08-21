import { Button } from '@/components/ui/button'
import { CustomInput } from '@/components/ui/CustomInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { forgotPasswordSchema, ForgotPasswordValues } from '../../schemas'
import useForgotPassword from '../../hooks/useForgotPassword'
import Loader from '@/components/ui/Loader/Loader'

const ForgotPasswordForm = () => {
  const forgotPassword = useForgotPassword()
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })
  const { register, formState, handleSubmit } = form
  const { errors } = formState

  const onSubmit = (data: ForgotPasswordValues) => {
    forgotPassword.mutate(data)
  }

  return (
    <form
      className="flex w-full flex-col gap-3"
      onSubmit={(e) => {
        e.stopPropagation()
        handleSubmit(onSubmit)(e)
      }}
      noValidate
    >
      <CustomInput
        type="text"
        id="email"
        placeholder="mail@simmmple.com"
        label={'Email'}
        width="w-full"
        className="bg-white"
        passwordinput={false}
        error={errors.email?.message}
        {...register('email')}
      />

      <div className="mt-8 flex flex-col gap-11">
        <Button
          type="submit"
          data-mdb-button-init
          data-mdb-ripple-init
          className="h-full w-full whitespace-nowrap rounded bg-[#2563EB] py-2 font-semibold text-white hover:bg-blue-700 lg:px-40"
          disabled={forgotPassword.isPending}
        >
          {forgotPassword.isPending ? (
            <Loader fillColor="#FFFFFF" width="25" height="25" />
          ) : (
            'Send code'
          )}
        </Button>
      </div>
    </form>
  )
}

export default ForgotPasswordForm
