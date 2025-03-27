import { useState, useRef, useCallback, useMemo } from 'react';

export default function Stopwatch() {
    const [startTime, setStartTime] = useState<number | null>(null);
    const [now, setNow] = useState<number | null>(null);
    // const [reduceSeconds, setReduceSeconds] = useState(0);
    const reduceSecondsRef = useRef(0)

    const intervalRef = useRef<any>(null);

    const secondsPassed = useMemo(() => {
        if (startTime != null && now != null) {
            return reduceSecondsRef.current + ((now - startTime) / 1000);
        }
        return 0
    }, [now, startTime])


    function handleStart() {
        setStartTime(Date.now());
        setNow(Date.now());

        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setNow(Date.now());
        }, 10);
    }

    const handleStop = useCallback(() => {
        clearInterval(intervalRef.current);
        reduceSecondsRef.current = secondsPassed
        // setReduceSeconds(secondsPassed)
        // setStartTime(null)
        // setNow(null)
    }, [secondsPassed])

    const handleReset = useCallback(() => {
        clearInterval(intervalRef.current);
        reduceSecondsRef.current = 0
        setStartTime(null)
        setNow(null)
    }, [secondsPassed])




    return (
        <>
            <h1>时间过去了： {secondsPassed.toFixed(3)}</h1>
            <button onClick={handleStart}>
                开始
            </button>
            <button onClick={handleStop}>
                停止
            </button>
            <button onClick={handleReset}>
                重置
            </button>
        </>
    );
}
