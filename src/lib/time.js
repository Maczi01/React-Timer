const getTimeInMinutesAndSeconds = (totalTimeInSeconds) => {
    const minutesLeft = Math.floor(totalTimeInSeconds / 60);
    const secondsLeft = Math.floor(totalTimeInSeconds % 60);
    return [minutesLeft, secondsLeft]
}

function fizzBuzz(i) {
    let result = '';
    // let out = '';
    if (i % 3 === 0) {
        result += 'Fizz';
    }
    if (i % 5 === 0) {
        result += 'Buzz';
    }
    return result || i;
}

function xxx(str) {
    return str.split("").reduce((xyz, abc)=> abc + xyz, '');
}

export {getTimeInMinutesAndSeconds, fizzBuzz, xxx}