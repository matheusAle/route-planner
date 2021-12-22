import {
  Form,
  HandleSubmit,
  SubmitAction,
  TextInput,
} from 'common/components/form'
import {REGISTER_URL, TRAVELS_URL} from 'common/routes-urls'
import {Link, useNavigate} from 'react-router-dom'
import {useLogin} from './use-login'
import {Login, valdiationSchema} from './validations'

export const LoginPage = () => {
  const login = useLogin()
  const navigate = useNavigate()
  const onSubmit: HandleSubmit<Login> = async ({email, password}) => {
    await login(email, password)
    navigate(TRAVELS_URL, {replace: true})
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="card w-full md:bordered md:w-1/3 md:bg-base-200">
        <div className="card-body">
          <h2 className="card-title">Sign up</h2>
          <Form<Login>
            validationSchema={valdiationSchema}
            initialValues={{email: '', password: ''}}
            onSubmit={onSubmit}
          >
            <TextInput name="email" type="email" label="Email" />
            <TextInput
              name="password"
              type="password"
              label="Password"
              autoComplete="password"
            />
            <SubmitAction className="w-full">login</SubmitAction>
          </Form>
          <div className="divider opacity-40 text-xs">OR</div>
          <Link to={REGISTER_URL} className="mx-auto text-sm">
            Register Now
          </Link>
        </div>
      </div>
    </div>
  )
}
