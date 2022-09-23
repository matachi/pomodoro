import { add, intervalToDuration, milliseconds, min, toDate } from 'date-fns'
import { getLastElement } from '../util/helpers'

export default class TimeInterval {
  private _length: Duration
  private _segments: Interval[]
  private _isRunning: boolean
  private _isPomodoro: boolean
  private _hasShownNotification: boolean

  public constructor(length: Duration, segments: Interval[], isRunning: boolean,
      isPomodoro: boolean, hasShownNotification: boolean) {
    this._length = length
    this._segments = segments
    this._isRunning = isRunning
    this._isPomodoro = isPomodoro
    this._hasShownNotification = hasShownNotification
  }

  public static StartNew(length: Duration, isPomodoro: boolean) : TimeInterval {
    const timeInterval = new TimeInterval(length, [], false, isPomodoro, false)
    timeInterval.run()
    return timeInterval
  }

  public get length(): Duration {
    return this._length
  }

  public get segments(): Interval[] {
    return this._segments
  }

  public get isRunning(): boolean {
    return this._isRunning
  }

  public get isPomodoro(): boolean {
    return this._isPomodoro
  }

  public get hasShownNotification(): boolean {
    return this._hasShownNotification
  }

  public set hasShownNotification(value: boolean) {
    this._hasShownNotification = value
  }

  public run(force: boolean = false) {
    if (this._isRunning && !force) {
        return
    }
    this._isRunning = true
    const start = new Date()
    const end = add(start, this.remainingTime)
    this._segments.push({ start, end })
  }

  public pause() {
    if (!this._isRunning) {
      return
    }
    this._isRunning = false
    if (this._hasTimeLeft && this._segments.length !== 0) {
      getLastElement(this._segments)!.end = new Date()
    }
  }

  public get start(): Date {
    return toDate(this._segments[0].start)
  }

  public get end(): Date {
    return min([getLastElement(this._segments)!.end, new Date()])
  }

  private get _hasTimeLeft(): boolean {
    return milliseconds(this.remainingTime) > 0
  }

  public get remainingTime(): Duration {
    return intervalToDuration({
      start: 0,
      end: milliseconds(this._length) - milliseconds(this.elapsedTime)
    })
  }

  public get elapsedTime(): Duration {
    const lengthInMilliseconds = this._segments
      .map(x => {
        const duration = intervalToDuration({
          start: x.start,
          end: min([x.end, new Date()])
        })
        const ms = milliseconds(duration)
        return ms
      })
      .reduce((x, y) => x + y, 0)
    const elapsedTime = intervalToDuration({
      start: 0,
      end: lengthInMilliseconds
    })
    return elapsedTime
  }
}