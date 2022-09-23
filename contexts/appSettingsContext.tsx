import { Interval } from 'date-fns'
import { createContext, FC, ReactNode, useEffect, useState } from 'react'
import AppSettings, { AppSettingsContextState, RawAppSettings } from '../models/appSettings'
import TimeInterval from '../models/timeInterval'

const contextDefaultValues: AppSettingsContextState = {
  appSettings: {
    pomodoroLength: 25,
    breakLength: 5,
    intervals: [],
    autoStart: true,
    playAudio: true,
    showNotification: true
  },
  setAppSettings: () => {}
}

const AppSettingsContext = createContext<AppSettingsContextState>(contextDefaultValues)
export default AppSettingsContext

type Props = {
  children?: ReactNode
}

const appSettingsKey = 'appSettings'

function getValuesFromLocalStorage(): AppSettings | null {
  const savedItem = localStorage.getItem(appSettingsKey)
  if (savedItem != null) {
    const rawAppSettings: RawAppSettings = JSON.parse(savedItem)
    console.log(rawAppSettings)
    const appSettings: AppSettings = {
      ...rawAppSettings,
      intervals: rawAppSettings.intervals
        .map<TimeInterval>((interval, _) => new TimeInterval(
          interval.length,
          interval.segments?.map<Interval>((segment, _) => ({
            start: new Date(segment.start),
            end: new Date(segment.end)
          })) ?? [],
          interval.isRunning,
          interval.isPomodoro,
          interval.hasShownNotification))
    }
    return appSettings
  }
  return null
}

export const AppSettingsProvider: FC<Props> = ({ children }) => {
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [appSettings, setAppSettings] = useState<AppSettings>(contextDefaultValues.appSettings)

  useEffect(() => {
    var appSettings = getValuesFromLocalStorage()
    if (appSettings != null) {
      setAppSettings(appSettings)
    }
  }, [])

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false)
      return
    }
    const rawAppSettings: RawAppSettings = {
      ...appSettings,
      intervals: appSettings.intervals
        .map((interval, _) => ({
          length: interval.length,
          segments: interval.segments,
          isRunning: interval.isRunning,
          isPomodoro: interval.isPomodoro,
          hasShownNotification: interval.hasShownNotification
        }))
    }
    localStorage.setItem(appSettingsKey, JSON.stringify(rawAppSettings))
  }, [appSettings])

  return (
    <AppSettingsContext.Provider value={{ appSettings, setAppSettings }}>
      {children}
    </AppSettingsContext.Provider>
  )
}