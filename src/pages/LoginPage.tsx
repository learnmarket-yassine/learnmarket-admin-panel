import { CustomInput } from '@/components/ui/CustomInput'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Checkbox } from '@/components/ui/checkbox'
import Loader from '@/components/ui/Loader/Loader'
import { useState } from 'react'
import useLogin from '@/features/auth/hooks/useLogin'
import { LoginFormData, loginSchema } from '@/features/auth/schemas'

const LoginPage = () => {
  const loginQuery = useLogin()
  const [rememberMe, setRememberMe] = useState(false)

  const from = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })
  const { register, handleSubmit, formState } = from
  const { errors } = formState
  const onSubmit = (data: LoginFormData) => {
    loginQuery.mutate(data)
  }

  return (
    <form
      className="flex flex-col gap-6 sm:min-w-full"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <CustomInput
        type="text"
        id="email"
        placeholder="nomcomplet@email.com"
        label="Email"
        width="w-full"
        className={'bg-white'}
        passwordinput={false}
        required={true}
        error={errors.email?.message}
        {...register('email')}
      />
      <CustomInput
        type="password"
        id="password"
        required={true}
        placeholder={'********'}
        label={'Password'}
        width="w-full"
        className="bg-white"
        error={errors.password?.message}
        passwordinput={true}
        {...register('password')}
      />
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="rememberMe"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(!!checked)}
            className="h-5 w-5 cursor-pointer border-[#6B7280]"
          />
          <label htmlFor="rememberMe" className="cursor-pointer text-sm text-[#6B7280]">
            Keep me logged in
          </label>
        </div>

        <Link to="/forgot-password" className="cursor-pointer text-sm text-[#2563EB] underline">
          Forgot password?
        </Link>
      </div>

      <div className="mt-8 flex w-full flex-col gap-11">
        <Button
          type="submit"
          data-mdb-button-init
          data-mdb-ripple-init
          className="w-full whitespace-nowrap rounded bg-[#2563EB] py-2 font-semibold text-white hover:bg-[#2563EB] lg:px-40"
          disabled={loginQuery.isPending}
        >
          {loginQuery.isPending ? (
            <Loader
              fillColor="#FFFFFF"
              width="25"
              height="25"
              className="flex w-full items-center justify-center"
            />
          ) : (
            'Login'
          )}
        </Button>
      </div>
    </form>
  )
}

export default LoginPage
