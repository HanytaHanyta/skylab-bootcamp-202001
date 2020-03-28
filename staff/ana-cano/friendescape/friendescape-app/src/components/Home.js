import React, { useEffect, useState } from 'react'
import '../sass/components/home.sass'
import Logo from '../images/FriendEscape.png'
import Item from './Item'



export default function ({user, onHandleLocations, onHandleLogOut, availableEscape, onGoToSearch, onGoToJoinGroups, onGoToDetail, onHandleTheme}) {
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
    <div className="search">
    <section>
    <nav className='search__main'>

        <form className="search__form" onSubmit={handleGoToSearch}>
        <a className="burger fas fa-bars" onClick={handleOpenNav}></a>
            <input type="text" name="escroom" placeholder="Search your escape room" onChange={handleGoToChangeSearch}/>
        </form>
        <div className={menu ? "sidemenu active" : "sidemenu"}>
            <ul className="menu">
            <li><a className="textMenu" onClick={handleLocations} >Locations</a></li>
            <li><a className="textMenu" >Difficulty</a></li>
            <li><a className="textMenu" onClick={handleTheme}>Theme</a></li>
            </ul>
        </div>
    </nav>
    </section>
    </div>

{/* Groups */}

<section className='main__groups'>
        <span> Do you want to live one adventure but you don't know who will be as brave as you? <br/>
        Join one of our groups or create a new one and... Show must go on!!</span><br/>

        <a href="" onClick = {handleGoToJoinGroups} className="main__btn">Join a group</a>
        <br></br>
        <a onClick={handleGoToCreateAGroup} className="main__btn"> Create a Group </a>

</section>



{/* Search */}
<div className="escapesroom search">
    <p>Escapes Room</p>
    <ul>
        {availableEscape.map(escape => <Item key={escape._id} item={escape} onGoToDetail={onGoToDetail} />)}
    </ul>
</div>

    </>
}
