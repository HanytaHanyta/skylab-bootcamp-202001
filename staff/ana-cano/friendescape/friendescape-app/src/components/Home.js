import React, { useEffect, useState } from 'react'
import './home.sass'
import { withRouter } from 'react-router-dom'
import Logo from './FriendEscape.png'
import Item from './Item'
import Group from './group.jpg'


export default function ({user, availableEscape, onGoToSearch, onGoToJoinGroups, onGoToCreateAGroup, onGoToLocations, onItemClick}) {
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

        onGoToCreateAGroup()
    }

    function handleGoToLocations(event) {
        event.preventDefault()
        onGoToLocations
    }

    
    return <>
    {/* Header */}
   <div className="header">
    <figure>
        <img className='header__logo' src ={Logo} alt="Logo"/>
    </figure>
    <div className='header__username'>
<p>Welcome {name}</p>
    <i className="fas fa-sign-out-alt"></i>
    </div>
    </div>

    {/* Search */}
    <div className="search">
    <section>
    <nav className='search__main'>
        <a className="burger fas fa-bars" onClick={handleOpenNav}></a>
        <form className="login__form" onSubmit={handleGoToSearch}>
            <input type="text" name="escroom" placeholder="Search your escape room" onChange={handleGoToChangeSearch}/> 
            <button><i className="fas fa-search"></i></button>  
        </form>
        <div className={menu ? "sidemenu active" : "sidemenu"}>
            <ul className="menu">
            <li><a className="textMenu" onClick={handleGoToLocations}>Locations</a></li>
            <li><a className="textMenu" >Difficulty</a></li>
            <li><a className="textMenu" >Theme</a></li>
            </ul>
        </div>
    </nav>  
    </section>
    </div>

{/* Groups */}

<section className='main__groups'>
        <span> Do you want to live one adventure but you don't know who will be as brave as you? <br/>
        Join one of our groups or create a new one and... Show must go on!!</span><br/>
        <div className="main__buttons">
        <button onClick={handleGoToJoinGroups} className="btn--detail"> Join one of our groups</button>   
        <button onClick={handleGoToCreateAGroup} className="btn--detail"> Create a Group </button>
        </div>
</section>



{/* Search */}
<div className={availableEscape ? "escapesroom search" : "escapesroom query"}>
    <p>Escapes Room</p>
    <ul>
        {availableEscape.map(escape => <Item key={escape._id} item={escape} onClick={onItemClick} />)}
    </ul>
</div>

    </>
}
