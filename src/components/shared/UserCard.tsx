import { useUserContext } from '@/context/AuthContext'
import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = () => {
const {user}=useUserContext();
  return (
    <div>
      <Link to={'/profile/${user.id'} className='flex gap-3 items-center'>
          <img
          src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="profile"
          className='h-12 w-12 rounded-full'
          />
          <div className="flex flex-col">
            <p className="body-bold">
              {user.name}
            </p>
            <p className='small-regular text-light-3'>
              @{user.username}
            </p>
          </div>
        </Link>

    </div>
  )
}

export default UserCard
