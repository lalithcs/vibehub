import { useParams, NavLink } from "react-router-dom";
import Loader from "@/components/shared/Loader";
import GridPostList from "@/components/shared/GridPostList";
import { useGetUserById, useGetUserPosts, useGetSavedPosts } from "@/lib/react-query/queriesAndMutations";
import { useMemo } from "react";

const Profile = () => {
  const { id } = useParams();

  const { data: profileUser, isPending: isUserLoading } = useGetUserById(id);
  const { data: userPosts, isPending: isPostsLoading } = useGetUserPosts(id);
  const { data: savedData, isPending: isSavedLoading } = useGetSavedPosts(id);

  const posts = userPosts?.documents ?? [];
  const savedPosts = useMemo(() => savedData?.posts ?? [], [savedData]);

  if (isUserLoading) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-inner_container w-full max-w-5xl">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-primary-500 flex items-center justify-center">
            <span className="text-white font-bold text-3xl">
              {profileUser?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex flex-col">
            <h1 className="h3-bold">{profileUser?.name || 'User'}</h1>
            <p className="text-light-3">@{profileUser?.username || 'username'}</p>
          </div>
        </div>

        <div className="mt-8 border-b border-dark-4 flex gap-6">
          <NavLink
            to={`/profile/${id}`}
            end
            className={({ isActive }) =>
              `pb-3 ${isActive ? 'text-primary-500 border-b-2 border-primary-500' : 'text-light-3'}`
            }
          >
            Posts
          </NavLink>
          <NavLink
            to={`/profile/${id}/saved`}
            className={({ isActive }) =>
              `pb-3 ${isActive ? 'text-primary-500 border-b-2 border-primary-500' : 'text-light-3'}`
            }
          >
            Saved
          </NavLink>
        </div>

        <div className="mt-6">
          {/* Default route shows Posts grid */}
          {/* We will rely on nested routing in App.tsx already supports /profile/:id/* */}
          {/* Render based on pathname segment */}
          {location.pathname.endsWith('/saved') ? (
            isSavedLoading ? (
              <div className="flex-center w-full h-40"><Loader /></div>
            ) : savedPosts.length === 0 ? (
              <p className="text-light-4">No saved posts.</p>
            ) : (
              <GridPostList posts={savedPosts} />
            )
          ) : (
            isPostsLoading ? (
              <div className="flex-center w-full h-40"><Loader /></div>
            ) : posts.length === 0 ? (
              <p className="text-light-4">No posts yet.</p>
            ) : (
              <GridPostList posts={posts} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile
