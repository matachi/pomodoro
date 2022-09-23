type TimeDisplayProps = {
    minutes: number,
    seconds: number
}

export default function TimeDisplay({minutes, seconds}: TimeDisplayProps) {
    return <h1 className='text-center'>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</h1>
}