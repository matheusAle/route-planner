import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const errorNotification = (msg: string) =>
  toast(msg, {
    autoClose: 3000,
    pauseOnHover: true,
    theme: 'dark',
  })
