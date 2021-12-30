import React from 'react'
import {
  Form,
  HandleSubmit,
  SubmitAction,
  TextInput,
} from 'common/components/form'
import {LOGIN_URL} from 'common/routes-urls'
import {Link, useNavigate} from 'react-router-dom'
import {useUserRegister} from './use-user-register'
import {Register, valdiationSchema} from './validations'

export const RegisterPage = () => {
  const register = useUserRegister()
  const navigate = useNavigate()

  const onSubmit: HandleSubmit<Register> = async ({email, password}) => {
    await register(email, password)
    navigate(LOGIN_URL)
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="card w-full md:bordered md:w-1/3 md:bg-base-200">
        <div className="card-body">
          <h2 className="card-title">Sign up</h2>
          <Form<Register>
            validationSchema={valdiationSchema}
            initialValues={{email: '', password: '', password_confirm: ''}}
            onSubmit={onSubmit}
          >
            <TextInput name="email" type="email" label="Email" />
            <TextInput
              name="password"
              type="password"
              label="Password"
              autoComplete="new-password"
            />
            <TextInput
              name="password_confirm"
              type="password"
              label="Confirm Password"
              autoComplete="new-password"
            />
            <SubmitAction className="w-full">Register</SubmitAction>
          </Form>
          <div className="divider opacity-40 text-xs">OR</div>
          <Link to={LOGIN_URL} className="mx-auto text-sm">
            Login Now
          </Link>
        </div>
      </div>
    </div>
  )
}
