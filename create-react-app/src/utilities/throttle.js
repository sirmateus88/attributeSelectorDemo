const throttle = (delay, callback) => {
    let called = false;
    return () => {
        if(!called){
            called = true;
            callback();
            setTimeout(() => {
                called = false;
            }, delay);
        }
    }
}

export default throttle;