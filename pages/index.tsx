import type { NextPage } from 'next'
import Head from 'next/head'
import Pomodoro from '../components/pomodoro'

const Index: NextPage = () => {
  return <>
    <Head>
      <title>Pomodoro timer</title>
      <meta name='description' content='Pomodoro timer' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <div className='grid-container'>
      <div className='grid-x grid-margin-x'>
        <div className='cell medium-12'>
          <Pomodoro />
        </div>
      </div>
    </div>
  </>
}

export default Index