const getTimeInMinutesAndSeconds = (totalTimeInSeconds) =>{
    const minutesLeft = Math.floor(totalTimeInSeconds / 60);
    const secondsLeft = Math.floor(totalTimeInSeconds % 60);
    return [minutesLeft, secondsLeft]
}

export { getTimeInMinutesAndSeconds}