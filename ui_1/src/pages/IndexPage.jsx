import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import img1 from '../assets/images/photo.jpg'
import { BrowserProvider } from 'ethers'

const IndexPage = () => {
    const [id, setId] = useState('')

    const provider = new BrowserProvider(window.ethereum)
    async function connectToMetamask() {
        const signer = await provider.getSigner();
        console.log("signer", signer.address)
    }

    return (
        <>
            <nav className='bg-black h-16 flex items-center'>
                <div className="flex justify-between w-full px-4">
                    <button 
                        onClick={connectToMetamask} 
                        className="rounded-md text-white bg-blue-500 border-none font-serif h-10 px-4 hover:bg-blue-600"
                    >
                        Connect To Metamask
                    </button>
                    <div className='space-x-4'>
                        <Link to="/">
                            <button 
                                className="text-white bg-transparent border-none font-serif h-10 px-4 hover:underline"
                            >
                                Home
                            </button>
                        </Link>
                        <Link to="/issue">
                            <button 
                                className="text-white bg-transparent border-none font-serif h-10 px-4 hover:underline"
                            >
                                Issue Certificate
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>
            <div className='bg-gray-200 pb-[220px]'>
            <div>
                <h1 className="pt-16 text-4xl text-center font-bold font-serif">Certificate Dapp</h1>
                <img src={img1} className="size-60 mx-auto mt-12 mb-10" alt="Dapp"/>
            </div>
            <div className="text-center">
                <input 
                    type="text" 
                    name="textname" 
                    required 
                    placeholder="Enter Certificate Id to view" 
                    className="border-2 border-sky-400 px-4 py-2 rounded-lg" 
                    value={id} 
                    onChange={(e) => setId(e.target.value)}
                />
                <Link to={`/view/${id}`}>
                    <button 
                        type="button" 
                        className="text-white bg-blue-500 hover:bg-blue-600 w-20 h-10 rounded-lg mt-2"
                    >
                        Search
                    </button>
                </Link>
            </div>
            </div>
        </>
    )
}

export default IndexPage
