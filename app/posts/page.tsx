import React from 'react';
import {PostsProvider} from "@/app/hooks/postsContext";
import PostsList from "@/app/components/PostsList";

const PostsPage: React.FC = () => {
    return (
        <PostsProvider>
            <div className="p-4">
                <PostsList />
            </div>
        </PostsProvider>
    );
};

export default PostsPage;
