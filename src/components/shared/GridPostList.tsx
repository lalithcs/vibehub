import { Models } from 'appwrite';
import { Link } from 'react-router-dom';

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({ posts, showUser = true }: GridPostListProps) => {
  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.$id}`} className="grid-post_link">
            <div className="h-full w-full bg-dark-3 rounded-lg p-4 flex flex-col justify-between">
              <div>
                <p className="text-light-1 font-semibold line-clamp-3 mb-2">
                  {post.caption}
                </p>
                <div className="flex flex-wrap gap-1">
                  {post.tags?.slice(0, 3).map((tag: string) => (
                    <span key={tag} className="text-xs text-primary-500">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {post.location && (
                <p className="text-light-3 text-sm">📍 {post.location}</p>
              )}
            </div>
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2">
                <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
                  <span className="text-white text-xs">
                    {post.creator?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
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

