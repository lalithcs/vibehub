import { useUserContext } from '@/context/AuthContext'
import { Link } from 'react-router-dom'

const UserCard = () => {
const {user}=useUserContext();
  return (
    <div>
      <Link to={'/profile/${user.id'} className='flex gap-3 items-center'>
          <div className="h-12 w-12 rounded-full bg-primary-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {user.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
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
