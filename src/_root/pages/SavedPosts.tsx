"use client";

import * as React from "react";
import Loader from "@/components/shared/Loader";
import GridPostList from "@/components/shared/GridPostList";
import { useUserContext } from "@/context/AuthContext";
import { useGetSavedPosts } from "@/lib/react-query/queriesAndMutations";

const SavedPosts: React.FC = () => {
  const { user } = useUserContext();
  const { data, isPending } = useGetSavedPosts(user.id);

  if (isPending) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  const posts = data?.posts ?? [];

  return (
    <div className="common-container w-full">
      <div className="w-full max-w-5xl">
        <h1 className="h3-bold md:h2-bold w-full">Saved Posts</h1>
        {posts.length === 0 ? (
          <p className="text-light-4 mt-10">You have no saved posts yet.</p>
        ) : (
          <div className="mt-6">
            <GridPostList posts={posts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPosts;