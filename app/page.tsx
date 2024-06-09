import React from "react";
import Link from "next/link";

export default function Home() {
    return (
        <main>
            <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
                <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
                    <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
                        <div>
                            <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                                Welcome to our modern platform
                            </h1>
                            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                Discover the power of our cutting-edge features and tools to elevate your online
                                presence.
                            </p>
                            <div className="space-x-4 mt-6">
                                <Link
                                    href="/posts"
                                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 mb-5"
                                    prefetch={false}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                        <img
                            src="https://miro.medium.com/v2/format:webp/4*2Yw3jYjZYAXYLeSGmQyvjw.png"
                            alt="Hero"
                            className="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover"
                        />
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container space-y-12 px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Discover our powerful
                                features</h2>
                            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                Our platform offers a wide range of tools and features to help you achieve your goals.
                            </p>
                        </div>
                    </div>
                    <div
                        className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                        <div className="grid gap-1">
                            <h3 className="text-lg font-bold">Intuitive Design</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Our platform features a clean and modern design that enhances user experience.
                            </p>
                        </div>
                        <div className="grid gap-1">
                            <h3 className="text-lg font-bold">Powerful Analytics</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Gain valuable insights into your performance with our advanced analytics tools.
                            </p>
                        </div>
                        <div className="grid gap-1">
                            <h3 className="text-lg font-bold">Seamless Integration</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Easily integrate our platform with your existing tools and workflows.
                            </p>
                        </div>
                        <div className="grid gap-1">
                            <h3 className="text-lg font-bold">Scalable Infrastructure</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Our platform is designed to scale with your business, ensuring seamless growth.
                            </p>
                        </div>
                        <div className="grid gap-1">
                            <h3 className="text-lg font-bold">Exceptional Support</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Our dedicated support team is here to help you every step of the way.
                            </p>
                        </div>
                        <div className="grid gap-1">
                            <h3 className="text-lg font-bold">Secure and Reliable</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Rest assured that your data is safe and secure with our robust security measures.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
