// import { useUserContext } from '@/context/AuthContext'
// import { Models } from 'appwrite'

// import { Link } from 'react-router-dom'
// import PostStats from './PostStats'

// type GridPostListProps={
//   posts: Models.Document[];
//   showUser?: boolean;
//   showStats?: boolean;
// }
// const GridPostList = ({ posts, showUser= true, showStats = true }: GridPostListProps) => {
//   const {user}=useUserContext();
//   return (
//     <ul className="grid-container">
//       {posts.map((post) => (
//         <li key={post.$id} className='relative min-w-80 h-80'>
//           <Link to={`/posts/${post.$id}`} className='grid-post_link'>
//           <img 
//           src={post.imageUrl}
//           alt="post"
//           className='h-full w-full object-cover'
//           />
//           </Link>

//           {/* <div className='grid-post_user'>
//             {showUser &&(<div className='flex items-center justify-start gap-2'>
//               <img 
//               src={post.creator.imageUrl}
//               alt="creator"
//               className='h-8 w-8 rounded-full'
//               />
//               <p className='line-clamp-1'>{post.creator.name}</p>
//             </div>)}
//             {showStats && <PostStats post={post} userId={user.id} />}
//           </div> */}
//           <div className="grid-post_user">
//             {showUser && (
//               <div className="flex items-center justify-start gap-2">
//                 {post.creator.imageUrl ? (
//                   <img
//                     src={post.creator.imageUrl}
//                     alt="creator"
//                     className="h-8 w-8 rounded-full"
//                   />
//                 ) : (
//                   <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
//                     <span>No Image</span>
//                   </div>
//                 )}
//                 <p className="line-clamp-1">{post.creator.name}</p>
//               </div>
//             )}
//             </div>

//         </li>
//       ))}
//     </ul>
//   )
// }

// export default GridPostList
// import { useUserContext } from '@/context/AuthContext';
import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
// import PostStats from './PostStats';

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};
// showStats = true
const GridPostList = ({ posts, showUser = true,  }: GridPostListProps) => {
  //const { user } = useUserContext();

  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.$id}`} className="grid-post_link">
            {post.imageUrl ? (
              <img
                src={post.imageUrl}
                alt="post"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-200">
                <span>No Image</span>
              </div>
            )}
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2">
                {post.creator?.imageUrl ? (
                  <img
                    src={post.creator.imageUrl}
                    alt="creator"
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span>No Image</span>
                  </div>
                )}
                <p className="line-clamp-1">{post.creator?.name || 'Unknown User'}</p>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;

