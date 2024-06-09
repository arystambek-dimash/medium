'use client';

import React, {createContext, useContext, useEffect, useState, ReactNode} from 'react';
import api from '../api/api'

const axios = api

export type Post = {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: { [key: string]: number };
    views: number;
    userId: number;
    imageSrc: string;
};

export type Comment = {
    id: number;
    body: string;
    postId: number;
    userId: number;
};

export type Author = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    profileImage: string;
    image: string;
};

interface PostsContextInterface {
    posts: Post[];
    comments: Comment[];
    author: Author | null;
    loading: boolean;
    error: string | null;
    fetchPost: (id: number) => Promise<Post | null>;
    fetchComments: (postId: number) => void;
    fetchAuthor: (userId: number) => void;
    loadMorePosts: () => void;
}

const defaultState: PostsContextInterface = {
    posts: [],
    comments: [],
    author: null,
    loading: true,
    error: null,
    fetchPost: async () => null,
    fetchComments: () => {
    },
    fetchAuthor: () => {
    },
    loadMorePosts: () => {
    },
};

const PostsContext = createContext<PostsContextInterface>(defaultState);

export const usePosts = () => {
    return useContext(PostsContext);
};

interface PostsProviderProps {
    children: ReactNode;
}

export const PostsProvider: React.FC<PostsProviderProps> = ({children}) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [author, setAuthor] = useState<Author | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [skip, setSkip] = useState<number>(0);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await axios.get<{ posts: Post[] }>(`https://dummyjson.com/posts?limit=10&skip=${skip}`);
            console.log('Fetched posts:', response.data.posts); // Debugging log
            const newPosts = response.data.posts.map(post => ({
                ...post,
                imageSrc: `https://picsum.photos/1200/600?random=${post.id}`,
            }));
            setPosts(prevPosts => [...prevPosts, ...newPosts]);
            setSkip(prevSkip => prevSkip + 10);
        } catch (error) {
            console.error('Error fetching posts:', error); // Debugging log
            setError('Error fetching posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPost = async (id: number): Promise<Post | null> => {
        setLoading(true);
        try {
            const response = await axios.get<Post>(`https://dummyjson.com/posts/${id}`);
            console.log('Fetched post:', response.data); // Debugging log
            return {
                ...response.data,
                imageSrc: `https://picsum.photos/1200/600?random=${response.data.id}`,
            };
        } catch (error) {
            console.error('Error fetching post details:', error); // Debugging log
            setError('Error fetching post details');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const fetchComments = async (postId: number) => {
        setLoading(true);
        try {
            const response = await axios.get<{ comments: Comment[] }>(`https://dummyjson.com/posts/${postId}/comments`);
            console.log('Fetched comments:', response.data.comments);
            setComments(response.data.comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
            setError('Error fetching comments');
        } finally {
            setLoading(false);
        }
    };

    const fetchAuthor = async (userId: number) => {
        setLoading(true);
        try {
            const response = await axios.get<Author>(`https://dummyjson.com/users/${userId}`);
            console.log('Fetched author:', response.data);
            setAuthor(response.data);
        } catch (error) {
            console.error('Error fetching author details:', error);
            setError('Error fetching author details');
        } finally {
            setLoading(false);
        }
    };

    const loadMorePosts = async () => {
        try {
            await fetchPosts();
        } catch (error) {
            console.error('Error loading more posts:', error);
        }
    };

    return (
        <PostsContext.Provider
            value={{posts, comments, author, loading, error, fetchPost, fetchComments, fetchAuthor, loadMorePosts}}
        >
            {children}
        </PostsContext.Provider>
    );
};
