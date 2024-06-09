'use client';

import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import api from '../../api/api';
import LoginModal from "@/app/components/LoginModal";
import {useUser} from "@/app/hooks/userContext";
import {fa} from "@faker-js/faker";

const Navbar: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const {user} = useUser()

    useEffect(() => {
        console.log(user)
        if (user) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [user])

    const handleAvatarClick = () => {
        setShowMenu(!showMenu);
    };

    const handleSignOut = () => {
        setIsLoggedIn(false);
        setShowMenu(false);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchQuery.trim() === '') {
                setSearchResults([]);
                return;
            }

            try {
                const response = await api.get(`/posts/search?q=${searchQuery}`);
                setSearchResults(response.data.posts);
            } catch (error) {
                console.error('Error searching posts:', error);
            }
        };

        fetchSearchResults();
    }, [searchQuery]);

    return (
        <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 text-lg font-bold" prefetch={false}>
                    <span className="text-3xl font-serif text-black">
                        <span style={{color: '#12100E'}}>M</span>
                        <span style={{color: '#FF3E00'}}>e</span>
                        <span style={{color: '#FF9100'}}>d</span>
                        <span style={{color: '#FFF400'}}>i</span>
                        <span style={{color: '#3EAA00'}}>u</span>
                        <span style={{color: '#0066FF'}}>m</span>
                    </span>
                </Link>
                <form className="relative flex-1 max-w-md">
                    <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"/>
                    <input
                        type="search"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full rounded-full border border-gray-300 bg-gray-100 py-2 pl-10 pr-4 focus:border-gray-500 focus:bg-white focus:outline-none"
                    />
                    {searchResults.length > 0 && (
                        <div
                            className="absolute left-0 right-0 top-full mt-2 max-h-60 overflow-y-auto bg-white border border-gray-200 shadow-md rounded-md z-10">
                            {searchResults.map((result: any) => (
                                <Link key={result.id} href={`/posts/${result.id}`}
                                      className="block p-4 hover:bg-gray-100" prefetch={false}>
                                    {result.title}
                                </Link>
                            ))}
                        </div>
                    )}
                </form>
                <nav className="hidden space-x-4 md:flex items-center">
                    {!isLoggedIn ? (
                        <>
                            <Link href="/posts" className="rounded-full px-3 py-2 transition-colors hover:bg-gray-100"
                                  prefetch={false}>
                                Posts
                            </Link>
                            <LoginModal/>
                        </>
                    ) : (
                        <>
                            <Link href="/write" className="rounded-full px-3 py-2 transition-colors hover:bg-gray-100"
                                  prefetch={false}>
                                Write
                            </Link>
                            <BellIcon
                                className="h-6 w-6 text-gray-600 transition-colors hover:text-black cursor-pointer"/>
                            <div className="relative">
                                <UserAvatar
                                    className="h-8 w-8 rounded-full bg-gray-700 text-white flex items-center justify-center cursor-pointer"
                                    onClick={handleAvatarClick}
                                />
                                {showMenu && (
                                    <div
                                        className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-md rounded-md">
                                        <button
                                            onClick={handleSignOut}
                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </nav>
                <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                    <MenuIcon className="h-6 w-6"/>
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </div>
        </header>
    );
};

const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
        <line x1="4" y1="6" x2="20" y2="6"/>
        <line x1="4" y1="12" x2="20" y2="12"/>
        <line x1="4" y1="18" x2="20" y2="18"/>
    </svg>
);

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
);

const BellIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
);

const UserAvatar: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
    <div {...props}
         className={`h-8 w-8 rounded-full bg-gray-700 text-white flex items-center justify-center cursor-pointer ${props.className}`}>
        D
    </div>
);

const SunMediumIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
        <circle cx="12" cy="12" r="4"/>
        <line x1="12" y1="2" x2="12" y2="4"/>
        <line x1="12" y1="20" x2="12" y2="22"/>
        <line x1="2" y1="12" x2="4" y2="12"/>
        <line x1="20" y1="12" x2="22" y2="12"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    </svg>
);

interface ButtonProps {
    variant: 'ghost';
    size: 'icon';
    className?: string;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({variant, size, className, children}) => {
    const baseStyle = 'inline-flex items-center justify-center focus:outline-none';
    const variantStyle = {
        ghost: 'bg-transparent text-gray-700',
    };
    const sizeStyle = {
        icon: 'p-2',
    };
    return (
        <button className={`${baseStyle} ${variantStyle[variant]} ${sizeStyle[size]} ${className}`}>
            {children}
        </button>
    );
};

export default Navbar;
