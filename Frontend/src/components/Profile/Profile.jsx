import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

const Profile = () => {
    const {profileId} = useParams();
    const location = useLocation();
    console.log(location.state)
    console.log(profileId)
  return (
    <>
    <div className='profile-wrapper'>
       <div className='profile-detail'>
        <img style={{width:"60px"}} src={location.state.profilePic} alt="" />
       <h2> {location.state.name}</h2>
       <h2> {location.state.email}</h2>
       <h2> {location.state.phone}</h2>
       </div>
        
       <div className='address-detail'>
<h1>Address</h1>
</div>
<div className='detail'>
<h1>details</h1>
</div>
        </div></>
  )
}

export default Profile