import React, { useState } from 'react'
import Logo from '../images/FriendEscape.png'
import InfiniteCalendar from 'react-infinite-calendar'
import 'react-infinite-calendar/styles.css'
import TimeKeeper from 'react-timekeeper'
import '../sass/components/createagroup.sass'


export default function ({ user, onHandleLogOut, onHandleProfile, onHandleGoHome, onHandleCreateANewGroup, availableEscapes }) {
    const { name } = user
    const [time, setTime] = useState('12:00pm')
    const [selectedRoom, setSelectedRoom] = useState()
    const [date, setDate] = useState()


    function handleLogOut(event) {
        event.preventDefault()
        onHandleLogOut()

    }
    function handleGoToHome(event) {
        event.preventDefault()
        onHandleGoHome()
    }

    function handleProfile(event){
        event.preventDefault()
        onHandleProfile()
    }


    var today = new Date()
    var nextMonths = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 90);



    return <>
        {/* Header */}
        <div className="header">
    <figure>
        <img className='header__logo' src ={Logo} alt="Logo"/>
    </figure>
    <div className='header__username'>
    <span>Welcome {name}</span>
    <i class="fas fa-cog" onClick={handleProfile}></i>
    <i className="fas fa-sign-out-alt" onClick={handleLogOut}></i>
    </div>
    </div>

        <div className="creategroup">

            <h1 className="cards__title">Create a new group</h1>

<div className="calendar">
            <InfiniteCalendar
                width={400}
                height={300}
                min={today}
                max={nextMonths}
                selectedDate={date}
                onSelect={function (date) {
                    setDate(new Date(date))
                    
                }}
                
            />


            {date &&
                <div className="timekeeper">
                    <TimeKeeper
                        onChange={(newTime) => setTime(newTime.formatted12)}
                        doneButton={(newTime) => (
                            <div
                                style={{ textAlign: 'center', padding: '10px 0' }}
                            
                            >
                                <p>Selected time {time}</p>
                            </div>
                            

                        )}


                    />
</div>
            }
            {date && <>
                <h3>And finally..., choose your escape room</h3>
                <select className="creategroup__select"
                    onChange={event => {/*this.setState({selectedEscape: e.target.value})*/
                        event.preventDefault();
                        const selected = availableEscapes.find(room => room._id === event.target.value)
                        setSelectedRoom(selected)

                    }}>
                    <option value="select a escaperoom">Select a escapeRoom</option>
                    {availableEscapes && availableEscapes.map(escaperoom => <option key={escaperoom.title} value={escaperoom._id}>{escaperoom.title}</option>)}
                </select>

                {selectedRoom &&

                    <div>
                        <p>Description: {selectedRoom.description}</p>
                        <p>Location: {selectedRoom.location}</p>
                        <p>Punctuation: {selectedRoom.punctuation}</p>
                        <p>Difficulty: {selectedRoom.difficulty}</p>
                        <p>Price: {selectedRoom.price}</p>
                        <p> Min-players: {selectedRoom.minplayers}</p>
                        <p> Max-players: {selectedRoom.maxplayers}</p>
                        <img alt="img escapeRoom" src={selectedRoom.img} />
                        <a className="btn--main" target="_blank" href={selectedRoom && selectedRoom.web}><i class="fas fa-ticket-alt"></i>Reserva aquí</a>
                        <br></br>
                    </div>
                }
            </>}

        </div>


        
        
        <button className="btn--difficulty" onClick={event => {
            event.preventDefault();
            onHandleCreateANewGroup(selectedRoom._id, date, time)
        }} className="btn--difficulty"><i class="fas fa-user-plus"></i> Create a Group </button>
        <br></br>
        <button onClick = {handleGoToHome} className="btn--difficulty"><i class="fas fa-undo-alt"></i>Go Back</button>
        </div>
    </>

}

