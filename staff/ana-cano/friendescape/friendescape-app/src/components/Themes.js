import React, { useEffect, useState } from 'react'
import '../sass/components/home.sass'
import Logo from '../images/FriendEscape.png'
import Item from './Item'
import Group from '../images/group.jpg'


export default function ({user, onHandleLocations, onHandleLogOut, availableEscape, onGoToSearch, onGoToJoinGroups, onGoToCreateAGroup, onGoToDetail, onHandleTheme}) {
    const {name} = user
    const [menu, setMenu] = useState(false)

    function handleOpenNav (event) {
        event.preventDefault()
       menu ? setMenu(false): setMenu(true)
    }

    function handleGoToSearch(event) {
        event.preventDefault()
        const query = event.target.escroom.value
        onGoToSearch(query)
    }

    function handleGoToChangeSearch(event) {
        event.preventDefault()
        const query = event.target.value
        onGoToSearch(query)
    }

    function handleGoToJoinGroups(event) {
        event.preventDefault()

        onGoToJoinGroups()
    }

    function handleGoToCreateAGroup(event) {
        event.preventDefault()
    }

    function handleLogOut(event){
        event.preventDefault()
        onHandleLogOut()

    }

    function handleLocations(event){
        event.preventDefault()
        onHandleLocations()
    }
    function handleTheme(event){
        event.preventDefault()
        onHandleTheme()
    }



    return <>
    {/* Header */}
   <div className="header">
    <figure>
        <img className='header__logo' src ={Logo} alt="Logo"/>
    </figure>
    <div className='header__username'>
<p>Welcome {name}</p>
    <i className="fas fa-sign-out-alt" onClick={handleLogOut}></i>
    </div>
    </div>





{/* Search */}


    </>
}
