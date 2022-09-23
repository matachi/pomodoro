import '../styles/globals.scss'
import Layout from '../components/layout'
import type { AppProps } from 'next/app'
import 'foundation-sites/scss/foundation.scss'
import { AppSettingsProvider } from '../contexts/appSettingsContext'
import { useEffect } from 'react'

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission()
    }
  })
  return (
    <Layout>
      <AppSettingsProvider>
        <Component {...pageProps} />
      </AppSettingsProvider>
    </Layout>
  )
}