import React from 'react'
import TimeKeeper from 'react-timekeeper'

export default function ({handleTime}) {

    return <>
        <h3>CHOOSE THE TIME</h3>
        <TimeKeeper
            //time={time}
            onChange={(newTime) => /*setTime(newTime.formatted12)*/ handleTime(newTime.formatted12)}
            doneButton={(newTime) => (
                <div
                    style={{ textAlign: 'center', padding: '10px 0' }}
                    onClick={() => alert('new time is now', newTime.formatted12)}
                >Close
                </div>
            )}
        />
    </>
}