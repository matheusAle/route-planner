import React, {PropsWithChildren} from 'react'
import MediaQuery from 'react-responsive'

const mdScreen = 768
const lgScreen = 1024

export const ScreenLayout = {
  Smartphone: ({children}: PropsWithChildren<any>): React.ReactElement => (
    <MediaQuery maxWidth={mdScreen - 0.001}>{children}</MediaQuery>
  ),
  Tablet: ({children}: PropsWithChildren<any>): React.ReactElement => (
    <MediaQuery minWidth={mdScreen} maxWidth={lgScreen - 0.001}>
      {children}
    </MediaQuery>
  ),
  NotAnDesktop: ({children}: PropsWithChildren<any>): React.ReactElement => (
    <MediaQuery maxWidth={lgScreen - 0.00001}>{children}</MediaQuery>
  ),
  Desktop: ({children}: PropsWithChildren<any>): React.ReactElement => (
    <MediaQuery minWidth={lgScreen}>{children}</MediaQuery>
  ),
}
