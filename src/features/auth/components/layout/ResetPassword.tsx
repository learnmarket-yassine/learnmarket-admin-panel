import ResetPasswordForm from '@/features/auth/components/ui/ResetPasswordForm'

const ResetPasswordPage = () => {
  return (
    <section className="flex w-[650px] flex-col rounded-2xl bg-white/80 px-12 py-16 backdrop-blur-sm">
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-7 px-32">
        <h1 className="text-3xl font-bold text-[#102A63]">Create a new password</h1>
        <p className="text-[#8E949F]">Choose a strong and secure password for your account.</p>
        <ResetPasswordForm />
      </div>
    </section>
  )
}

export default ResetPasswordPage
