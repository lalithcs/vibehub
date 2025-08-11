import { INewUser, IUpdatePost, INewPost } from "@/types";
import { ID, Query } from 'appwrite'
import { account, appwriteConfig, avatars, databases } from "./config";

// export async function createUserAccount(user: INewUser){
//     try {
//        const newAccount = await account.create(
//         ID.unique(),
//         user.email,
//         user.password,
//         user.name
//        ) ;

//        if(!newAccount) throw Error;

//        const avatarUrl=avatars.getInitials(user.name);

//        const newUser = await saveUserToDB({
//         accountId: newAccount.$id,
//         name:newAccount.name,
//         email: newAccount.email,
//         username: user.username,
//         imageUrl: avatarUrl,
//        });

//        return newUser;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }

export async function saveUserToDB(user : {
    accountId: string,
    email: string,
    name: string,
    imageUrl: URL,
    username?: string,
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        );

        return newUser;
    } catch (error) {
       console.log(error); 
    }
}

// export async function signInAccount(user: {
//     email: string,
//     password: string,
// }) {
//     try {
//         const session = await account.createEmailPasswordSession(user.email, user.password);
//         return session;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }
// Function to check if the user is logged in
export async function isUserLoggedIn() {
    try {
        const currentAccount = await account.get();
        return !!currentAccount; // Returns true if user is logged in
    } catch (error) {
        console.log("User is not logged in:", error);
        return false; // User is not logged in
    }
}

// Example usage of isUserLoggedIn before creating an account
export async function createUserAccount(user: INewUser) {
    const loggedIn = await isUserLoggedIn();
    if (loggedIn) {
        console.log("User is already logged in. Please log out first.");
        signOutAccount();
        return null;
    }

    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );

        if (!newAccount) throw new Error("Account creation failed");

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
        });

        return newUser;
    } catch (error) {
        console.log("Error creating account:", error);
        return error;
    }
}

// Similarly, update the signInAccount function to check if the user is logged in
export async function signInAccount(user: { email: string, password: string }) {
    const loggedIn = await isUserLoggedIn();
    if (loggedIn) {
        console.log("User is already logged in.");
        return null;
    }

    try {
        const session = await account.createEmailPasswordSession(user.email, user.password);
        return session;
    } catch (error) {
        console.log("Error signing in:", error);
        return error;
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
         
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function signOutAccount() {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function createPost(post: INewPost) {
    try {
        //Convert tags to array
        const tags = post.tags?.replace(/ /g,'').split(',') || [];
        //Save post to database
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.collectionId,
            ID.unique(),
            {
                caption: post.caption,
                location: post.location,
                tags: tags,
                creator: post.userId,
            }
        )
        
        if(!newPost){
            throw Error;
        }
        return newPost;
    } catch (error) {
        console.log(error);
        return error;   
    }
}

export async function getRecentPosts() {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.collectionId,
            [Query.orderDesc('$createdAt' ), Query.limit(20)]
        );
        if(!posts) throw Error;
        return posts;
    } catch (error) {
        console.log(error);
    }
}


export async function likePost(postId: string, likesArray: string[]) {
    try {
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.collectionId,
            postId,
            {
                likes: likesArray
            }
        );
        if(!updatedPost) throw Error;
        return updatedPost;
    } catch (error) {
        console.log(error);
    }
}

export async function savePost(postId: string, userId: string) {
    try {
        const updatedPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            ID.unique(),
            {
                user: userId,
                post: postId,

            }
        );
        if(!updatedPost) throw Error;
        return updatedPost;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteSavedPost(savedRecordId: string) {
    try {
        const statusCode = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            savedRecordId,
        );
        if(!statusCode) throw Error;
        return { status : 'ok'};
    } catch (error) {
        console.log(error);
    }
}

export async function getPostById(postId?: string) {
    if(!postId) throw Error;
    try {
        const post = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.collectionId,
            postId
        );
        if(!post) throw Error;
        return post;
    } catch (error) {
        console.log(error);
    }
}

export async function updatePost(post: IUpdatePost) {
    try {
        //Convert tags to array
        const tags = post.tags?.replace(/ /g,'').split(',') || [];
        //Save post to database
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.collectionId,
            post.postId,
            {
                caption: post.caption,
                location: post.location,
                tags: tags,
            }
        )

        if(!updatedPost){
            throw Error;
        }
        return updatedPost;
    } catch (error) {
        console.log(error);
        return error;   
    }
}


export async function deletePost(postId: string) {
    if(!postId) throw Error;
    try {
        const statusCode = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.collectionId,
            postId
        );
        
        if(!statusCode) throw Error;
        
        return {status: 'ok'};
    } catch (error) {
        console.log(error);
    }
    
}

export async function getInfinitePosts({pageParam}:{pageParam: number}) {
    const queries: any[]= [Query.orderDesc("$updatedAt"), Query.limit(10)]

    if(pageParam){
        queries.push(Query.cursorAfter(pageParam.toString()));

    }
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.collectionId,
            queries
        )

        if(!posts) throw Error;

        return posts;
        
    } catch (error) {
        
    }
    
}

export async function searchPosts(searchTerm: string) {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.collectionId,
            [Query.search('caption', searchTerm)]
        )

        if(!posts) throw Error;

        return posts;
        
    } catch (error) {
        
    }
    
}

export async function getTopCreators() {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );
  
    if (!posts) throw Error;
    return posts;
  }
// api.ts
import { PlacementStatistics } from '../react-query/types.ts';

export const fetchPlacementStatistics = async (): Promise<PlacementStatistics> => {
//   const response = await axios.get<PlacementStatistics>('/api/placement-statistics'); // Replace with your API endpoint
//   return response.data;
    const staticData: PlacementStatistics = {
        totalStudents: 1000,
        placedStudents: 800,
        unplacedStudents: 200,
        highestPackage: 1000000,
        lowestPackage: 300000,
        averagePackage: 500000,
        companyVisits: 100,
        offersMade: 1000,
    };
    return staticData;
    };

