'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PostsProvider } from '@/app/hooks/postsContext';
import PostDetails from '@/app/components/PostDetails';

const PostPage: React.FC = () => {
    const params = useParams();
    const id = params.id ? Number(params.id) : null;

    if (!id) {
        return <div>Loading...</div>;
    }

    return (
        <PostsProvider>
            <PostDetails postId={id} />
        </PostsProvider>
    );
};

export default PostPage;
