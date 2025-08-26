"use client"

import { useState, useEffect } from 'react'
import { Bounce, ToastContainer, toast } from "react-toastify";


export default function AdminServices() {

    const [services, setServices] = useState([])

    const getAllservices = async () => {
        let res = await fetch('http://localhost:3000/api/services')
        let data = await res.json()
        setServices(data.data)
    }

    const updateMainTitle = (event, index) => {
        let newData = [...services]
        newData[index].mainTitle = event.target.value
        setServices(newData)
    }

    const updateSecondaryTitle = (event, index) => {
        let newData = [...services]
        newData[index].secondaryTitle = event.target.value
        setServices(newData)
    }
    const updateThirdTitle = (event, index) => {
        let newData = [...services]
        newData[index].thirdTitle = event.target.value
        setServices(newData)
    }
    const updateFourthTitle = (event, index) => {
        let newData = [...services]
        newData[index].fourthTitle = event.target.value
        setServices(newData)
    }

    const updatePara1 = (event, index) => {
        let newData = [...services]
        newData[index].para1 = event.target.value
        setServices(newData)
    }
    const updatePara2 = (event, index) => {
        let newData = [...services]
        newData[index].para2 = event.target.value
        setServices(newData)
    }
    const updatePara3 = (event, index) => {
        let newData = [...services]
        newData[index].para3 = event.target.value
        setServices(newData)
    }
    const updatePara5 = (event, index) => {
        let newData = [...services]
        newData[index].para5 = event.target.value
        setServices(newData)
    }
    const updatePara6 = (event, index) => {
        let newData = [...services]
        newData[index].para6 = event.target.value
        setServices(newData)
    }
    const updatePara7 = (event, index) => {
        let newData = [...services]
        newData[index].para7 = event.target.value
        setServices(newData)
    }
    const updatePara4 = (event, index) => {
        let newData = [...services]
        newData[index].para4 = event.target.value
        setServices(newData)
    }
    const updatePara8 = (event, index) => {
        let newData = [...services]
        newData[index].para8 = event.target.value
        setServices(newData)
    }

    const updateData = async () => {
        let res = await fetch('http://localhost:3000/api/admin/services', {
            method: "POST",
            body: JSON.stringify({ AllServices: services })
        })

        if (res.status == 200) {
            sucessMsg("data updated sucessfully")
        } else {
            errorMsg("something went wrong")
        }
    }

    const sucessMsg = (message) => {
        toast.success(message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    const errorMsg = (message) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    useEffect(() => {
        getAllservices()
    }, [])

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="light"
            />
            <div className="md:mx-4">
                <div className="container m-auto px-4 md:px-0">
                    <div className="heading text-3xl font-semibold text-center my-4">Services</div>
                    <div className="faqs flex flex-col gap-6">
                        {services?.map((item, index) => (
                            <div className="faq flex flex-col" key={index}>
                                <label htmlFor="name">
                                    <div className="block py-2">Primary Title</div>
                                    <input type="text" name="name" id="name" className="px-2 rounded-sm outline-none ring-1 ring-zinc-400 w-full" value={item.mainTitle} onChange={(e) => {
                                        updateMainTitle(e, index)
                                    }} />
                                </label>
                                <label htmlFor="para1">
                                    <div className="block py-2">para1</div>
                                    <textarea name="para1" id="para1" className="px-2 rounded-sm outline-none ring-1 ring-zinc-400 w-full" value={item.para1} onChange={(e) => {
                                        updatePara1(e, index)
                                    }}></textarea>
                                </label>
                                <label htmlFor="para2">
                                    <div className="block py-2">para2</div>
                                    <textarea name="para2" id="para2" className="px-2 rounded-sm outline-none ring-1 ring-zinc-400 w-full" value={item.para2} onChange={(e) => {
                                        updatePara2(e, index)
                                    }}></textarea>
                                </label>
                                <label htmlFor="secondaryTitle">
                                    <div className="block py-2">secondaryTitle</div>
                                    <input type="text" name="secondaryTitle" id="secondaryTitle" className="px-2 rounded-sm outline-none ring-1 ring-zinc-400 w-full" value={item.secondaryTitle} onChange={(e) => {
                                        updateSecondaryTitle(e, index)
                                    }} />
                                </label>
                                <label htmlFor="para3">
                                    <div className="block py-2">para3</div>
                                    <textarea name="para3" id="para3" className="px-2 rounded-sm outline-none ring-1 ring-zinc-400 w-full" value={item.para3} onChange={(e) => {
                                        updatePara3(e, index)
                                    }}></textarea>
                                </label>
                                <label htmlFor="para4">
                                    <div className="block py-2">para4</div>
                                    <textarea name="para4" id="para4" className="px-2 rounded-sm outline-none ring-1 ring-zinc-400 w-full" value={item.para4} onChange={(e) => {
                                        updatePara4(e, index)
                                    }}></textarea>
                                </label>
                                <label htmlFor="thirdTitle">
                                    <div className="block py-2">secondaryTitle</div>
                                    <input type="text" name="thirdTitle" id="thirdTitle" className="px-2 rounded-sm outline-none ring-1 ring-zinc-400 w-full" value={item.thirdTitle} onChange={(e) => {
                                        updateThirdTitle(e, index)
                                    }} />
                                </label>
                                <label htmlFor="para5">
                                    <div className="block py-2">para3</div>
                                    <textarea name="para5" id="para5" className="px-2 rounded-sm outline-none ring-1 ring-zinc-400 w-full" value={item.para5} onChange={(e) => {
                                        updatePara5(e, index)
                                    }}></textarea>
                                </label>
                                <label htmlFor="para6">
                                    <div className="block py-2">para6</div>
                                    <textarea name="para6" id="para6" className="px-2 rounded-sm outline-none ring-1 ring-zinc-400 w-full" value={item.para6} onChange={(e) => {
                                        updatePara6(e, index)
                                    }}></textarea>
                                </label>
                                <label htmlFor="fourthTitle">
                                    <div className="block py-2">fourthTitle</div>
                                    <input type="text" name="fourthTitle" id="fourthTitle" className="px-2 rounded-sm outline-none ring-1 ring-zinc-400 w-full" value={item.fourthTitle} onChange={(e) => {
                                        updateFourthTitle(e, index)
                                    }} />
                                </label>
                                <label htmlFor="para7">
                                    <div className="block py-2">para7</div>
                                    <textarea name="para7" id="para7" className="px-2 rounded-sm outline-none ring-1 ring-zinc-400 w-full" value={item.para7} onChange={(e) => {
                                        updatePara7(e, index)
                                    }}></textarea>
                                </label>
                                <label htmlFor="para8">
                                    <div className="block py-2">para8</div>
                                    <textarea name="para8" id="para8" className="px-2 rounded-sm outline-none ring-1 ring-zinc-400 w-full" value={item.para8} onChange={(e) => {
                                        updatePara8(e, index)
                                    }}></textarea>
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="buttons my-4 flex items-center justify-end">
                        <button className="bg-zinc-800 text-white py-[2px] px-4 rounded-md w-fit" onClick={() => {
                            updateData()
                        }}>Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}
