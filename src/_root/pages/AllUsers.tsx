// import React from 'react';
// //import { useGetUsers } from '@/lib/react-query/queriesAndMutations';
// import { useUserContext } from '@/context/AuthContext';

const AllUsers: React.FC = () => {
  //const { data: users, isLoading, isError } = useGetUsers();
  // const {user}= useUserContext();
  // if (isLoading) return <Loader />;
  // if (isError) return <div>Error loading users</div>;

  return (
    <div className="all-users-container">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* {users?.map((user: { $id: React.Key | null | undefined; }) => (
          <UserCard key={user.$id}  /> */}
        {/* ))} */}
      </div>
    </div>
  );
};

export default AllUsers;
