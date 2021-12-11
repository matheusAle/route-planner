import {object, string} from 'yup'

export interface Login {
  email: string
  password: string
}

export const valdiationSchema = object({
  email: string().email().required(),
  password: string().min(6).required(),
})
