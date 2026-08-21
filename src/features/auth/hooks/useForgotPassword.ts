import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import axios from '@/lib/api/client'
import { ForgotPasswordValues } from '../schemas'
import ToastMessage from '@/components/layout/ToastMessage'

const forgotPassword = async (data: ForgotPasswordValues) => {
  const response = await axios.post('/auth/forgot-password', data)
  return response.data
}

const useForgotPassword = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: ForgotPasswordValues) => forgotPassword(data),
    onSuccess: (_, variables) => {
      ToastMessage({ type: 'success', message: 'A verification code has been sent to your email.' })
      navigate(`/verif-code?email=${variables.email}`)
    },
    onError: () => {
      ToastMessage({
        type: 'error',
        message: 'Could not send the verification code. Please try again.',
      })
    },
  })
}

export default useForgotPassword
