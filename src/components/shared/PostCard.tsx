import { useUserContext } from '@/context/AuthContext';
import { formatDate } from '@/lib/utils';
import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import PostStats from './PostStats';

type PostCardProps = {
    post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
    const { user } = useUserContext();
    if (!post.creator) return null;

    const parseCaption = (caption: string) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return caption.split(urlRegex).map((part, index) => {
            if (part.match(urlRegex)) {
                return (
                    <a
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline break-all"
                        style={{ wordBreak: 'break-all', overflowWrap: 'anywhere' }}
                    >
                        {part.length > 40 ? part.slice(0, 40) + '...' : part}
                    </a>
                );
            }
            return part;
        });
    };

    return (
        <div className="post-card">

            {/* ── Header: avatar + name + date ─────────────────── */}
            <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <Link to={`/profile/${post.creator.$id}`} className="shrink-0">
                        {/* w AND h both set — no more collapsed circle on mobile */}
                        <div className="rounded-full w-9 h-9 sm:w-11 sm:h-11 bg-primary-500 flex items-center justify-center">
                            <span className="text-white font-bold text-sm sm:text-base">
                                {post.creator?.name?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                        </div>
                    </Link>

                    <div className="flex flex-col min-w-0">
                        <p className="text-light-1 font-semibold text-sm sm:text-base truncate">
                            {post.creator.name}
                        </p>
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                            <p className="text-light-3 text-xs sm:text-sm">
                                {formatDate(post.$createdAt)}
                            </p>
                            {post.location && (
                                <>
                                    <span className="text-light-4 text-xs hidden xs:inline">·</span>
                                    <p className="text-light-3 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
                                        {post.location}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Edit icon — only visible to post creator */}
                <Link
                    to={`/update-post/${post.$id}`}
                    className={`shrink-0 ${user.id !== post.creator.$id ? 'hidden' : ''}`}
                >
                    <img
                        src="assets/icons/edit.svg"
                        alt="edit"
                        width={18}
                        height={18}
                        className="opacity-70 hover:opacity-100 transition-opacity"
                    />
                </Link>
            </div>

            {/* ── Caption ──────────────────────────────────────── */}
            <div className="py-3 sm:py-5">
                <p
                    className="text-light-1 text-sm sm:text-base leading-relaxed"
                    style={{ whiteSpace: 'pre-wrap' }}
                >
                    {parseCaption(post.caption)}
                </p>

                {post.tags?.length > 0 && (
                    <ul className="flex flex-wrap gap-1 mt-2">
                        {post.tags.map((tag: string) =>
                            tag ? (
                                <li key={tag} className="text-light-3 text-xs sm:text-sm">
                                    #{tag}
                                </li>
                            ) : null
                        )}
                    </ul>
                )}
            </div>

            {/* ── Stats: likes + save ──────────────────────────── */}
            <PostStats post={post} userId={user.id} />
        </div>
    );
};

export default PostCard;
