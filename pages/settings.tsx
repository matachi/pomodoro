import React, { useContext } from 'react'
import type { NextPage } from 'next'
import AppSettingsContext from '../contexts/appSettingsContext'

const Settings: NextPage = () => {
  const { appSettings, setAppSettings } = useContext(AppSettingsContext)
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    const name = target.name
    setAppSettings(prevState => {
      if (name === 'pomodoroLength') {
        const value = Number.parseInt(target.value)
        return { ...prevState, pomodoroLength: value }
      } else if (name === 'breakLength') {
        const value = Number.parseInt(target.value)
        return { ...prevState, breakLength: value }
      } else if (name === 'showNotification') {
        const value = target.checked
        return { ...prevState, showNotification: value }
      } else if (name === 'playAudio') {
        const value = target.checked
        return { ...prevState, playAudio: value }
      } else if (name === 'autoStart') {
        const value = target.checked
        return { ...prevState, autoStart: value }
      } else {
        throw new Error(`Unhandled field ${name}.`)
      }
    })
  }
  return (
    <>
      <div className="grid-container">
        <h2>Settings</h2>
        <form>
          <div className="grid-x grid-padding-x">
            <div className="medium-6 cell">
              <label>
                Pomodoro length
                <input name='pomodoroLength' type="text" placeholder=".medium-6.cell" value={appSettings.pomodoroLength} onChange={handleChange} />
              </label>
            </div>
            <div className="medium-6 cell">
              <label>
                Break length
                <input name='breakLength' type="text" placeholder=".medium-6.cell" value={appSettings.breakLength} onChange={handleChange} />
              </label>
            </div>
            <div className="medium-6 cell">
              <label>
                Show notification
                <div className="switch">
                  <input className="switch-input" id="showNotification" type="checkbox" name="showNotification" checked={appSettings.showNotification} onChange={handleChange} />
                  <label className="switch-paddle" htmlFor="showNotification">
                    <span className="show-for-sr">Show notification</span>
                  </label>
                </div>
              </label>
            </div>
            <div className="medium-6 cell">
              <label>
                Play alarm
                <div className="switch">
                  <input className="switch-input" id="playAudio" type="checkbox" name="playAudio" checked={appSettings.playAudio} onChange={handleChange} />
                  <label className="switch-paddle" htmlFor="playAudio">
                    <span className="show-for-sr">Play alarm</span>
                  </label>
                </div>
              </label>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Settings