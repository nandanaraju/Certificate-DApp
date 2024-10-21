import React, { useEffect, useState } from "react";
import img1 from "../assets/images/KBA_logo-1-1.png";
import img2 from "../assets/images/sign.png";
import { useParams, useNavigate } from "react-router-dom";
import { BrowserProvider, Contract } from "ethers";
import { abi } from "../scdata/Cert.json";
import { CertModuleCert } from "../scdata/deployed_addresses.json";

const ViewPage = () => {
  const provider = new BrowserProvider(window.ethereum);
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [grade, setGrade] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    async function getcert(id) {
      try {
        const signer = await provider.getSigner();
        const instance = new Contract(CertModuleCert, abi, signer);
        const result = await instance.Certificates(id);
        console.log(result);

        setName(result[0]);
        setCourse(result[1]);
        setGrade(result[2]);
        setDate(result[3]);
      } catch (error) {
        console.error("Error fetching certificate:", error);
      }
    }

    if (id) {
      getcert(id);
    }
  }, [id]);

  return (
    <>
    <div>
      {/* Home Button */}
      <button 
        className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
        onClick={() => navigate('/')}
      >
        Home
      </button>
    </div>
    <div className="certificate-container border-4 rounded-lg shadow-lg relative bg-gray-100 max-w-4xl mx-auto mt-8">
      
     

      {/* Top Section (Ribbon with Title and Award Badge) */}
      <div className="ribbon bg-blue-200 py-6 text-center text-white rounded-t-lg">
        <h1 className="text-3xl font-bold text-blue-900">KERALA BLOCKCHAIN ACADEMY</h1>
        <div className="award-circle mx-auto mt-6 rounded-full border-4 border-white text-yellow-500 w-24 h-24 flex items-center justify-center bg-gray-200">
          <img src={img1} alt="Academy Logo" className="w-16 h-16 object-contain"/>
        </div>
      </div>

      {/* Middle Section (Details) */}
      <div className="p-12 text-center">
        <h2 className="italic text-2xl font-semibold text-gray-700">This is to certify that</h2>
        <h1 className="text-4xl font-bold my-4 text-gray-800">{name || "Name Surname"}</h1>
        <h2 className="italic text-2xl font-semibold text-gray-700">has successfully completed</h2>

        <p className="text-4xl font-bold my-4 text-gray-800">{course || "Course Name"}</p>
        <h2 className="italic text-2xl font-semibold text-gray-700">with a grade of</h2>

        <p className="text-4xl font-bold my-4 text-gray-800">{grade || "Grade"}</p>
      </div>

      {/* Footer Section (Date and Signature) */}
      <div className="flex justify-between px-12 py-6 text-gray-600">
        <p className="text-xl font-semibold text-gray-800">Date: {date || "__________"}</p>
        <img src={img2} alt="Signature" className="w-32 h-16 object-contain"/>

        
      </div>
    </div>
    </>
  );
  
};

export default ViewPage;
