import React from 'react'
import { FaRegImage } from "react-icons/fa6";


export default function AboutSuspense() {

    return (
        <div>
            <div className="mt-8 px-4 container m-auto lg:px-44 bg-gray-100 rounded-lg animate-pulse">
                <div className="space-y-20 my-8">
                    <div className="flex flex-col lg:flex-row lg:items-center ">
                        <div className="left lg:w-[60%] lg:pr-8">
                            <div className="heading font-bold text-xl w-[15%] h-5 bg-gray-300"></div>
                            <div className="heading text-3xl font-bold my-6 flex gap-2 flex-col">
                                <div className="w-full h-6 bg-gray-300"></div>
                                <div className="w-[70%] h-6 bg-gray-300"></div>
                            </div>
                            <div className="mt-4 flex flex-col gap-2">
                                <div className="w-full h-3 bg-gray-300"></div>
                                <div className="w-full h-3 bg-gray-300"></div>
                            </div>
                            <div className="mt-4 flex flex-col gap-2">
                                <div className="w-full h-3 bg-gray-300"></div>
                                <div className="w-full h-3 bg-gray-300"></div>
                            </div>
                        </div>
                        <div className="mt-6 lg:w-[40%] xl:rounded-lg overflow-hidden ">
                            <div className="w-full h-full text-gray-300 flex items-center justify-center">
                                <FaRegImage size={300} />
                            </div>
                        </div>
                    </div>
                    <div className="mission">
                        <div className="heading text-3xl font-bold my-6 flex items-center justify-center">
                            <div className="w-[20%] h-8 bg-gray-300"></div>
                        </div>
                        <div className="flex flex-col xl:flex-row-reverse xl:items-center ">
                            <div className="left lg:w-[60%] lg:pr-8">
                                <div className="heading font-bold text-xl w-[15%] h-5 bg-gray-300"></div>
                                <div className="heading text-3xl font-bold my-6 flex gap-2 flex-col">
                                    <div className="w-full h-6 bg-gray-300"></div>
                                    <div className="w-[70%] h-6 bg-gray-300"></div>
                                </div>
                                <div className="mt-4 flex flex-col gap-2">
                                    <div className="w-full h-3 bg-gray-300"></div>
                                    <div className="w-full h-3 bg-gray-300"></div>
                                </div>
                                <div className="mt-4 flex flex-col gap-2">
                                    <div className="w-full h-3 bg-gray-300"></div>
                                    <div className="w-full h-3 bg-gray-300"></div>
                                </div>
                            </div>
                            <div className="mt-6 lg:w-[40%] xl:rounded-lg overflow-hidden ">
                                <div className="w-full h-full text-gray-300 flex items-center justify-center">
                                    <FaRegImage size={300} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
