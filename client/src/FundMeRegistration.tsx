import { useState } from "react";

export const FundMeRegistration = ({ web3, fundMeContract }: any) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const fund = async () => {
        if (!web3 || !fundMeContract) return;

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

    return (
        <div>
            <br />
            <h1>Fund Me</h1>
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input type="text" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
            <button onClick={fund}>Fund</button>
        </div>
    );
};
