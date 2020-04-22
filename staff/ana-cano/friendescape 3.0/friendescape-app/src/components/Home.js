import React, { useState } from 'react'
import '../sass/components/home.sass'
import Logo from '../images/FriendEscape.png'
import Item from './Item'



export default function ({user, onHandleLocations, onHandleProfile, onCreateAGroup, onHandleDifficulty, onHandleTheme, onHandleLogOut, availableEscape, onGoToSearch, onGoToJoinGroups, onGoToDetail}) {
    const {name} = user
    const [menu, setMenu] = useState(false)

    function handleOpenNav (event) {
        event.preventDefault()
       menu ? setMenu(false): setMenu(true)
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
        onCreateAGroup()
    }

    function handleLogOut(event){
        event.preventDefault()
        onHandleLogOut()

    }

    function handleLocations(event){
        event.preventDefault()
        onHandleLocations()
    }

    function handleDifficulty(event){
        event.preventDefault()
        onHandleDifficulty()
    }

    function handleTheme(event){
        event.preventDefault()
        onHandleTheme()
    }

    function handleProfile(event){
        event.preventDefault()
        onHandleProfile()
    }




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
    
    

    {/* Search */}
    <div className="search">
    <section>
    <nav className='search__main'>

        <form className="search__form">
        <a className="burger fas fa-bars" onClick={handleOpenNav}></a>
            <input className="search__query" type="text" name="escroom" placeholder="Search your escape room" onChange={handleGoToChangeSearch}/>
        </form>
        <div className={menu ? "sidemenu active" : "sidemenu"}>
            <ul className="menu">
            <li><a className="textMenu" onClick={handleLocations} >Locations</a></li>
            <li><a className="textMenu" onClick={handleDifficulty}>Difficulty</a></li>
            <li><a className="textMenu" onClick={handleTheme}>Theme</a></li>
            <li><a className="textMenu" onClick={handleGoToCreateAGroup}>Create a Group</a></li>
            <li><a className="textMenu" onClick={handleGoToJoinGroups}>Join a Group</a></li>
            </ul>
        </div>
    </nav>
    </section>
    </div>

{/* Groups */}

<section className='main__groups'>
        <span> Do you want to live one adventure but you don't know who will be as brave as you? <br/>
        Join one of our groups or create a new one and... Show must go on!!</span><br/>

        <a href="" onClick = {handleGoToJoinGroups} className="btn--main"><i class="fas fa-users"></i>Join a group</a>
        <a onClick={handleGoToCreateAGroup} className="btn--main"><i class="fas fa-user-plus"></i>Create a Group </a>

</section>



{/* Search */}
<div className="escapesroom cards search">
    <h1 className="cards__title">Escapes Room</h1>

    <ul>
        {availableEscape.map(escape => <Item key={escape._id} item={escape} onGoToDetail={onGoToDetail} />)}
    </ul>
</div>

    </>
}
