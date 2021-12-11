import {object, string} from 'yup'

export interface Register {
  email: string
  password: string
  password_confirm: string
}

export const valdiationSchema = object({
  email: string().email().required(),
  password: string().min(6).required(),
  password_confirm: string()
    .required()
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value
    }),
})
