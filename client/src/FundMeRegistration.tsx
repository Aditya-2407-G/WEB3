import { useState } from "react";
import { Link } from "react-router-dom";

export const FundMeRegistration = ({ web3, fundMeContract }: any) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const fund = async () => {
        if (!web3 || !fundMeContract || amount === '') return;

        const accounts = await web3.eth.getAccounts();
        fundMeContract.methods.fund(name).send({ from: accounts[0], value: web3.utils.toWei(amount, 'ether') })
            .on('transactionHash', (hash: any) => {
                console.log('Transaction hash:', hash);
            })  
            .on('receipt', (receipt: any) => {
                console.log('Transaction successful:', receipt);
            })
            .on('error', (error: any) => {
                console.error('Error:', error);
            });
    };

    const isAmountValid = amount !== '';

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">Fund Me</h1>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-80 p-2 mb-4 text-lg border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <input
                type="text"
                placeholder="Amount (in Ether)"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-80 p-2 mb-4 text-lg border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <button onClick={fund} className={`w-80 p-2 text-lg text-white bg-blue-500 rounded hover:bg-blue-600 mb-4 ${!isAmountValid && 'opacity-50 cursor-not-allowed'}`} disabled={!isAmountValid}>
                Fund
            </button>
            <Link to="/admin" className="w-80">
                <button className="w-full p-2 text-lg text-white bg-green-500 rounded hover:bg-green-600">
                Patrons
                </button>
            </Link>
        </div>
    );
};
