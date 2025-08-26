"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function BloagContent({ params }) {
    const [data, setData] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [found, setFound] = useState(undefined)

    const getData = async () => {
        let res = await fetch('http://localhost:3000/api/blog', {
            method: "POST",
            body: JSON.stringify({ id: params.slug })
        })

        let data = await res.json()

        setData(data.data)
        setLoading(false)

        if (res.status == 200) {
            setFound(true)
        } else {
            setFound(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        getData()
    }, [])

    // console.log(router.query.slug)

    return (
        <>
            {loading ? <div>Loading</div> :
                found ?
                    <div className="md:px-4 my-8">
                        <div className="container px-4 md:px-0 m-auto flex flex-col md:items-center lg:px-28 xl:px-36 2xl:px-48">
                            <div className="heading text-2xl md:text-3xl font-bold self-start">{data[0].title}</div>
                            <div className="para mb-8 md:mb-10 mt-4 ">{data[0].description}</div>
                            <Image src={data[0].imageUrl} width={800} height={800} />
                            <div className="content space-y-6 mt-6">
                                <div className="para">{data[0].para1}</div>
                                <div className="para">{data[0].para2}</div>
                                <div className="para">{data[0].para3}</div>
                            </div>
                        </div>
                    </div> : <div>Not found</div>
            }
        </>
    )
}