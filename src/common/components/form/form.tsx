import React from 'react'
import {Formik, FormikConfig, Form as ForlikForm} from 'formik'
import {ReactNode} from 'react'

interface FormProps<V> extends FormikConfig<V> {
  className?: string
  children: ReactNode
}

export const Form = <V extends Record<string, any>>({
  className,
  children,
  ...props
}: FormProps<V>) => {
  return (
    <Formik {...props}>
      <ForlikForm className={`${className}`} noValidate>
        {children}
      </ForlikForm>
    </Formik>
  )
}
