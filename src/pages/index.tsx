import React from 'react'
import {REGISTER_URL} from '@/common/routes-urls'
import {Routes, Route} from 'react-router-dom'
import {RegisterPage} from './auth/register'

export const Pages = () => {
  return (
    <Routes>
      <Route path={REGISTER_URL} element={<RegisterPage />} />
    </Routes>
  )
}
