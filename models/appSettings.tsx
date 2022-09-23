import { Dispatch, SetStateAction } from 'react'
import TimeInterval from './timeInterval'

export type RawAppSettings = {
  pomodoroLength: number,
  breakLength: number,
  intervals: {
    length: Duration,
    segments: Interval[],
    isRunning: boolean,
    isPomodoro: boolean,
    hasShownNotification: boolean
  }[],
  autoStart: boolean,
  showNotification: boolean,
  playAudio: boolean,
}

type AppSettings = {
  pomodoroLength: number,
  breakLength: number,
  intervals: TimeInterval[],
  autoStart: boolean,
  showNotification: boolean,
  playAudio: boolean,
}

export type AppSettingsContextState = {
  appSettings: AppSettings,
  setAppSettings: Dispatch<SetStateAction<AppSettings>>
}

export default AppSettings