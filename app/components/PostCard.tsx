import React from 'react';
import Link from 'next/link';
import {Post} from "@/app/hooks/postsContext";

interface PostCardProps {
    post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    return (
        <div className="flex border-b border-gray-200 py-6">
            <div className="flex-1 pr-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span className="font-semibold">User {post.userId}</span>
                    <span>in</span>
                    <span className="font-semibold">Django Unleashed</span>
                    <span>•</span>
                    <span>{new Date().toLocaleDateString()}</span>
                </div>
                <Link href={`/posts/${post.id}`} legacyBehavior>
                    <a>
                        <h2 className="mt-2 text-xl font-bold text-gray-900">{post.title}</h2>
                    </a>
                </Link>
                <p className="mt-1 text-gray-700">{post.body}</p>
                <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
                    {post.tags.map((tag) => (
                        <span key={tag} className="bg-gray-200 px-2 py-1 rounded-md">{tag}</span>
                    ))}
                    <span>{post.reactions.clap || 0} claps</span>
                    <span>•</span>
                    <span>{post.views} views</span>
                </div>
            </div>
            {post.imageSrc && (
                <div className="ml-4 flex-shrink-0">
                    <img src={post.imageSrc} alt="Post image" className="h-24 w-24 object-cover rounded-md" />
                </div>
            )}
        </div>
    );
};

export default PostCard;
