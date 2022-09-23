import { format, formatDuration } from 'date-fns'
import TimeInterval from '../models/timeInterval'

type TableProps = {
  intervals: TimeInterval[]
}

export default function Table({intervals}: TableProps) {
  return <>
    <table style={{ tableLayout: 'fixed' }}>
      <thead>
        <tr>
          <th>Type</th>
          <th>Start</th>
          <th>End</th>
          <th>Length</th>
        </tr>
      </thead>
      <tbody>
        {intervals.map((interval, index) => {
          return (
            <tr key={index}>
              <td>{interval.isPomodoro ? 'Pomodoro' : 'Break'}</td>
              <td>{format(interval.start, 'HH:mm:ss')}</td>
              <td>{format(interval.end, 'HH:mm:ss')}</td>
              <td>{formatDuration(interval.elapsedTime, { format: ['minutes', 'seconds'] })}</td>
            </tr>
          )
        }).reverse()}
      </tbody>
    </table>
  </>
}