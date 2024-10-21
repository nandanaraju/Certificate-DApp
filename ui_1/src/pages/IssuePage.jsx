import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BrowserProvider, Contract } from 'ethers'
import{abi} from "../scdata/Cert.json"
import { CertModuleCert } from "../scdata/deployed_addresses.json"

const IssuePage = () => {
    
    const[id,setId]=useState('')
    const [name,setName]=useState('')
    const [course,setCourse]=useState("Certified Blockchain Associate")
    const [grade,setGrade]=useState("S")
    const [date,setDate]=useState('')
    const navigate=useNavigate()

    const provider= new BrowserProvider(window.ethereum)
    async function connectToMetamask(){
        const signer=await provider.getSigner();
        console.log("signer",signer.address)
        
    }   
    async function issueCertificate(e){
        e.preventDefault()
        const signer=await provider.getSigner();
        console.log("signer",signer.address)
        const instance =new Contract(CertModuleCert,abi,signer)

        const txl =await instance.issue(id,name,course,grade,date)
        console.log('formdata',txl)
        navigate('/')
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
        <div className='bg-gray-200 pb-16'>
        <form  onSubmit={issueCertificate}>
       
        <h2 className=" text-2xl text-left font-bold font-serif">Certificate Dapp</h2>

        <div className=" ml-10 mt-12 mr-10  max-w-lg ">

            <h2 className="text-2xl font-bold font-serif">Issue New Certificate</h2>
            <div className="flex flex-col">
                <label className="block text-black-700 text-base text-xl pt-4  font-bold mb-2 font-serif"
                    >Select
                    Course*</label>
                <select name="course" className="border-2 border-black h-10"   value={course}
                onChange={(e)=>setCourse(e.target.value)}>
                    <option value="Certified Blockchain Associate">Certified Blockchain Associate</option>
                    <option value="Certified Ethereum Developer">Certified Ethereum Developer</option>
                    <option value="Certified Hyperledger Fabric Developer">Certified Hyperledger Fabric Developer</option>
                </select>
            </div>
            <div className="flex flex-col">
                <label className="block text-black-700 text-base text-xl pt-4  font-bold mb-2 font-serif"
                    >Certificate
                    Id*</label>
                <input type="text" name="txtName" placeholder="Certificate ID" className="border-2 border-black h-10" value={id}
                onChange={(e)=>setId(e.target.value)}/>
            </div>
            <div className="flex flex-col">
                <label className="block text-black-700 text-base text-xl pt-4  font-bold mb-2 font-serif"
                    >Candidate
                    Name*</label>
                <input type="text" name="txtName" placeholder="Candidate Name" className="border-2 border-black h-10" value={name}
                onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="flex flex-col">
                <label className="block text-black-700 text-base text-xl pt-4  font-bold mb-2 font-serif"
                    >Select
                    Grade*</label>
                <select name="grade" className="border-2 border-black h-10" value={grade}
                onChange={(e)=>setGrade(e.target.value)}>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
            </div>
            <div className="flex flex-col">
                <label className="block text-black-700 text-base text-xl pt-4  font-bold mb-2 font-serif" >Issue
                    Date*</label>
                <input type="date" id="issue date" className="border-2 border-black h-10" value={date}
                onChange={(e)=>setDate(e.target.value)}/>
            </div>
            <div>
                <input type="submit" name="submit" value="Submit"
                        className="bg-blue-500 hover:bg-blue-700 outline-none text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline mb-5"/>
            </div>



        </div>

    </form>
    </div>
        </>
    )
}

export default IssuePage