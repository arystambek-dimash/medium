"use client";

import React, {useState} from 'react';
import PostCard from './PostCard';
import {usePosts} from '@/app/hooks/postsContext';

const topics = [
    "For you", "Following", "UX", "Technology", "Python", "Programming"
];

const PostsList: React.FC = () => {
    const {posts, loading, error, loadMorePosts} = usePosts();
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const handleLoadMore = async () => {
        setIsLoadingMore(true);
        await loadMorePosts();
        setIsLoadingMore(false);
    };

    if (loading && !posts.length) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="w-[70%] m-auto">
            <div className="flex space-x-4 mb-4 overflow-x-auto scrollbar-hide">
                {topics.map((topic, index) => (
                    <button
                        key={index}
                        className="flex-shrink-0 text-gray-600 hover:text-black px-3 py-2 border-b-2 border-transparent hover:border-gray-300 focus:outline-none"
                    >
                        {topic}
                    </button>
                ))}
            </div>
            {posts.map((post) => (
                <PostCard key={post.id} post={post}/>
            ))}
            <div className="flex justify-center my-8">
                <button onClick={handleLoadMore}
                        disabled={isLoadingMore}>Load More
                </button>
            </div>
        </div>
    );
};

export default PostsList;
