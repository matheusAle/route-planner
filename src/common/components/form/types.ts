import {FormikHelpers} from 'formik'

export interface FormikProps {
  label: string
  name: string
  'data-testid'?: string
}

export type HandleSubmit<V> = (
  values: V,
  formikHelpers: FormikHelpers<V>,
) => void | Promise<any>
