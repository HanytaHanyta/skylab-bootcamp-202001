import Moment from 'react-moment'
import React, { useState } from 'react'
import '../sass/components/group.sass'
import Feedback from './Feedback'

import {isOwner, isJoined} from '../logic'


export default function ({ item, handleJoinGroup, handleLeaveGroup, handleDeleteGroup, error, user }) {
    const [warning, setWarning] = useState(false)
    const [warningDelete, setWarningDelete] = useState(false)
    const [warningLeave, setWarningLeave] = useState(false)
    const { id, date, time,  subevents, state, escapeRoom} = item
    
    let style = ""
    if(state === 'inactive') {
        style = "item__disabled"
    } else {
        subevents.length >= escapeRoom.minplayers ? style= "itemno" : style = "itemyes"
    }
  
    

     return <>
    <div className={style}>
        <li>
        <Moment className={style + '__date'} format="YYYY/MM/DD">{date}</Moment>
            <li>
            <h5>Title: {escapeRoom.title}</h5>
            
            <h5>Title: <span>{escapeRoom.title}</span></h5>
            <h5>Location: <span>{escapeRoom.location}</span></h5>
            <h5>Time: <span>{time}</span></h5>
            <h5>Punctuation: <span class={"</span>rating-five rating-five-" + escapeRoom.punctuation}></span></h5>
            <h5>Theme: <span>{escapeRoom.theme}</span></h5>
            <h5>Difficulty: <span class={"rating-three rating-three-" + escapeRoom.difficulty}></span></h5>
            <h5>Duration: <span>{escapeRoom.duration}</span></h5>
            <h5>Price: <span>{escapeRoom.price}</span></h5>
            <h5>State: <span>{state}</span></h5>
            <img className='results__img' src ={escapeRoom.img} alt="img escroom"/>
            <h5 className="join__integrantes"> Subevents: {subevents && subevents.map(subbed =>(<>
                <span> {subbed.name} {subbed.surname}</span>
                <br></br>
                <span className="join__trusty"> Trusty points: {subbed.trusty}</span>
                <br></br>
                <span className="join__foults"> Foults: {subbed.foults}</span>
                <br></br>
                <br></br>

            </>))}</h5>
            <h5>Min-Players: <span>{escapeRoom.minplayers}</span></h5>
            <h5>Max-Players: <span>{escapeRoom.maxplayers}</span></h5>
       </li>
            
            {/* {!user.subbedTo[0]._id === id && ( */}
            {!isOwner(user, id) && !isJoined(item) && subevents.length < escapeRoom.maxplayers  && <a href="" className="group__btn" onClick={e => {
                e.preventDefault()
                setWarning(!warning)
            }}><i class="fas fa-users"></i>Join team</a>}
            {/* )} */}
            {isOwner(user, id) && <a href="" className="group__btn" onClick={e => {
                e.preventDefault()
                setWarningDelete(!warning)
            }}><i class="fas fa-trash-alt"></i>Delete team</a>}
            {!isOwner(user, id) && isJoined(item) && <a href="" className="group__btn" onClick={e => {
                e.preventDefault()
                setWarningLeave(!warning)
            }}><i class="fas fa-trash-alt"></i>Leave team</a>}
            {!isOwner(user, id) && !isJoined(item) && subevents.length >= escapeRoom.maxplayers  && <a href="" className="group__btn" onClick={e => {
                e.preventDefault()
            }}><i class="fas fa-users"></i>This team is complete</a>}


            
            {warning && (<>
            <p>Read carefully these instructions. If you press Join Group you will be a new member of the group and you will adquire one trusty point. In the other hand if you are a show off in the escape room you will receive a fault. If you commit 3 faults you will be banned.</p>
            <button onClick={ event => {
                const id = item.id
                event.preventDefault();
                setWarning(false)
                handleJoinGroup(id)
                }}>Understood</button>
            <button onClick={event=> {
                event.preventDefault();
                setWarning(false)
            }}>Cancel</button>
            </>)}

            {warningDelete && (<>
            <p>Read carefully these instructions. If you press Delete Group you will receive a fault. If you commit 3 faults you will be banned. </p>
            <button onClick={ event => {
                const id = item.id
                event.preventDefault();
                setWarningDelete(false)
                handleDeleteGroup(id)
                }}>Understood</button>
            <button onClick={event=> {
                event.preventDefault();
                setWarningDelete(false)
            }}>Cancel</button>
            </>)}

            {warningLeave && (<>
            <p>Read carefully these instructions. If you press Leave Team you will receive a fault. If you commit 3 faults you will be banned. </p>
            <button onClick={ event => {
                const id = item.id
                event.preventDefault();
                setWarningLeave(false)
                handleLeaveGroup(id)
                }}>Understood</button>
            <button onClick={event=> {
                event.preventDefault();
                setWarningLeave(false)
            }}>Cancel</button>
            </>)}
            
            
            {error && <Feedback message={error} level="warning"/>}
            {/* <button onClick={() => {
        alert.show('Read carefully these instructions. If you press Join Group you will be a new member of the group. If you are a show off you will receive a fault. If you commit 3 faults you will be banned.')
      }} >Join Group
    </button> */}


        </li>
        </div>
    </>
}

