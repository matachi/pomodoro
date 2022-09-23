import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import AppSettingsContext from '../contexts/appSettingsContext'
import AppSettings from '../models/appSettings'
import TimeInterval from '../models/timeInterval'
import { getLastElement } from '../util/helpers'
import Table from './table'
import TimeDisplay from './time-display'

function getTime(intervals: TimeInterval[]): number[] {
  if (intervals.length == 0) {
    return [0, 0]
  }
  const remainingDuration = getLastElement(intervals)!.remainingTime
  return [remainingDuration.minutes ?? 0, remainingDuration.seconds ?? 0]
}

function startNewInterval(intervalLength: number, isPomodoro: boolean,
    setAppSettings: Dispatch<SetStateAction<AppSettings>>) {
  setAppSettings(prevState => {
    const currentInterval = getLastElement(prevState.intervals)
    currentInterval?.pause()
    const duration: Duration = { minutes: intervalLength }
    const newInterval: TimeInterval = TimeInterval.StartNew(duration, isPomodoro)
    return { ...prevState, intervals: [...prevState.intervals, newInterval] }
  })
}

function clearIntervals(setAppSettings: Dispatch<SetStateAction<AppSettings>>) {
  setAppSettings(prevState => {
    return { ...prevState, intervals: [] }
  })
}

function pause(setAppSettings: Dispatch<SetStateAction<AppSettings>>) {
  setAppSettings(prevState => {
    const currentInterval = getLastElement(prevState.intervals)
    if (currentInterval?.isRunning) {
      currentInterval?.pause()
    } else if (currentInterval != null) {
      currentInterval?.run()
    }
    return { ...prevState }
  })
}

export default function Pomodoro() {
  const { appSettings, setAppSettings } = useContext(AppSettingsContext)

  const [time, setTime] = useState(getTime(appSettings.intervals))
  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(getTime(appSettings.intervals))
    }, 100)
    return () => clearTimeout(timer)
  })

  useEffect(() => {
    const currentInterval = getLastElement(appSettings.intervals)
    if (currentInterval != null && !currentInterval!.hasShownNotification && time[0] == 0 && time[1] == 0) {
      try {
        new Audio('alarm.wav').play()
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            new Notification(getLastElement(appSettings.intervals)!.isPomodoro ? 'Time for a break' : 'Time to work')
          }
        })
      } catch (Exception) {
      }
      setAppSettings(prevState => {
        currentInterval.hasShownNotification = true
        return { ...prevState }
      })
    }
  }, [time, appSettings.intervals, setAppSettings])

  const currentInterval = getLastElement(appSettings.intervals)
  const hasStarted = currentInterval != null
  const isRunning = currentInterval?.isRunning

  return <>
    <TimeDisplay minutes={time[0]} seconds={time[1]} />
    <hr />
    <div className='button-group large align-center'>
      <button onClick={() => startNewInterval(appSettings.pomodoroLength, true, setAppSettings)} className='button success'>New pomodoro</button>
      <button onClick={() => startNewInterval(appSettings.breakLength, false, setAppSettings)} className='button'>Break</button>
      <button onClick={() => pause(setAppSettings)} className='button warning' disabled={!hasStarted}>{isRunning ? 'Pause' : 'Resume'}</button>
      <button onClick={() => clearIntervals(setAppSettings)} className='button alert'>Clear</button>
    </div>
    <hr />
    <Table intervals={appSettings.intervals} />
  </>
}