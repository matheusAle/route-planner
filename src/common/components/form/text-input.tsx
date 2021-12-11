import React, {InputHTMLAttributes} from 'react'
import {useField} from 'formik'
import {FormikProps} from './types'

export interface TextInputProps
  extends FormikProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {}

export const TextInput = ({...props}: TextInputProps) => {
  const [field, meta] = useField(props)
  const {label, name, 'data-testid': dataTestId} = props
  const hasErrors = meta.touched && meta.error

  const htmlClass = hasErrors
    ? 'input input-error input-bordered'
    : 'input input-bordered'

  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        id={name}
        data-testid={dataTestId || name}
        className={htmlClass}
        {...field}
        {...props}
      />
      {hasErrors ? (
        <label aria-label={meta.error} role="alert" className="label">
          <span className="label-test-alt text-red-400 text-sm">
            {meta.error}
          </span>
        </label>
      ) : null}
    </div>
  )
}
