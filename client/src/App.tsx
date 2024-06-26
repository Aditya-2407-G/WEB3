import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { contractABI } from "./abi";
import { Admin } from "./Admin";
import { FundMeRegistration } from "./FundMeRegistration";

function App() {
    const [web3, setWeb3] = useState(null);
    const [fundMeContract, setFundMeContract] = useState<any>(null);
    const contractAddress = "0x66E5367B422977338C6088D21C7577e907176693";

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(() => {
                    //@ts-ignore
                    const web3Instance = new Web3(window.ethereum);
                    setWeb3(web3Instance);

                    const fundMeInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
                    setFundMeContract(fundMeInstance);
                })
                .catch((err: any) => {
                    console.error(err);
                });
        } else {
            alert('Please connect to a Ethereum wallet! Patrons will be visible only when connected to a wallet.');
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<FundMeRegistration web3={web3} fundMeContract={fundMeContract} />} />
                <Route path="admin" element={<Admin web3={web3} fundMeContract={fundMeContract} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
