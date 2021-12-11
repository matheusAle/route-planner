import {useFormikContext} from 'formik'
import React, {InputHTMLAttributes} from 'react'

interface ActionProps extends InputHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const SubmitAction = ({children, className, ...props}: ActionProps) => {
  const {isSubmitting} = useFormikContext()
  return (
    <button
      {...props}
      type="submit"
      className={`btn btn-primary mt-5 ${className} ${
        isSubmitting ? 'loading' : ''
      }`}
    >
      {children}
    </button>
  )
}
