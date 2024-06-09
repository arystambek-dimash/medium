'use client';

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {usePosts, Post, Author} from '../hooks/postsContext';

interface PostDetailsProps {
    postId: number;
}

const PostDetails: React.FC<PostDetailsProps> = ({postId}) => {
    const {fetchPost, fetchComments, fetchAuthor, comments, loading, error, author} = usePosts();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        if (postId) {
            fetchPost(postId).then(postData => {
                setPost(postData);
                if (postData) {
                    fetchAuthor(postData.userId);
                }
            });
            fetchComments(postId);
        }
    }, [postId]);

    if (loading || !post) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-[45px]">
            <article className="prose prose-gray dark:prose-invert">
                <div className="space-y-4">
                    <div>
                        <img
                            src={post.imageSrc}
                            alt="Featured Image"
                            width={1200}
                            height={600}
                            className="rounded-lg object-cover aspect-[2/1]"
                        />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold">{post.title}</h1>
                        <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-2">
                                <UserIcon className="w-4 h-4"/>
                                <span>{author ? author.firstName + ' ' + author.lastName : 'Loading author...'}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <EyeIcon className="w-4 h-4"/>
                                <span>{post.views} views</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <TagIcon className="w-4 h-4"/>
                                <span>{post.tags.join(', ')}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>{post.body}</p>
                    </div>
                </div>
            </article>
            <div className="mt-8 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <HeartIcon className="w-5 h-5 fill-red-500"/>
                        <span className="text-gray-500 dark:text-gray-400">{post.reactions.clap}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <ThumbsUpIcon className="w-5 h-5 fill-blue-500"/>
                        <span className="text-gray-500 dark:text-gray-400">{post.reactions.thumbsUp}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <ThumbsDownIcon className="w-5 h-5 fill-gray-500"/>
                        <span className="text-gray-500 dark:text-gray-400">{post.reactions.thumbsDown}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <SmileIcon className="w-5 h-5 fill-yellow-500"/>
                        <span className="text-gray-500 dark:text-gray-400">{post.reactions.smile}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <Link href="#"
                          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                          prefetch={false}>
                        <ShareIcon className="w-5 h-5"/>
                        <span className="sr-only">Share</span>
                    </Link>
                    <Link href="#"
                          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                          prefetch={false}>
                        <BookmarkIcon className="w-5 h-5"/>
                        <span className="sr-only">Bookmark</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;

function BookmarkIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
        </svg>
    );
}

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
            <circle cx="12" cy="12" r="3"/>
        </svg>
    );
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path
                d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        </svg>
    );
}

function ShareIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
            <polyline points="16 6 12 2 8 6"/>
            <line x1="12" x2="12" y1="2" y2="15"/>
        </svg>
    );
}

function SmileIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" x2="9.01" y1="9" y2="9"/>
            <line x1="15" x2="15.01" y1="9" y2="9"/>
        </svg>
    );
}

function TagIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path
                d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/>
            <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>
        </svg>
    );
}

function ThumbsDownIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17 14V2"/>
            <path
                d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"/>
        </svg>
    );
}

function ThumbsUpIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7 10v12"/>
            <path
                d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/>
        </svg>
    );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
        </svg>
    );
}
