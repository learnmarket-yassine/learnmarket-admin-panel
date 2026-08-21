import LoginLayout from '@/features/auth/components/layout/LoginLayout'
import VerifCodeForm from '@/features/auth/components/ui/VerifCodeForm'
import useForgotPassword from '@/features/auth/hooks/useForgotPassword'
import { useSearchParams } from 'react-router-dom'

const VerifCodePage = () => {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') ?? ''
  const resendCode = useForgotPassword()

  const handleResend = () => {
    if (!email || resendCode.isPending) return
    resendCode.mutate({ email })
  }
  return (
    <LoginLayout>
      <VerifCodeForm />
      <p
        role="button"
        onClick={handleResend}
        className={
          resendCode.isPending
            ? 'cursor-not-allowed text-[#8E949F] underline'
            : 'cursor-pointer text-[#6B7280] underline'
        }
      >
        {resendCode.isPending ? 'Sending...' : resendCode.isSuccess ? 'Code resent' : 'Resend code'}
      </p>
    </LoginLayout>
  )
}

export default VerifCodePage
