import {useState} from "react";

export const CourseRegistration = ({web3, courseContract, courseFee} : any) => {
    const [email, setEmail] = useState('');

    const payForCourse = async () => {
        if (!web3 || !courseContract) return;

        const accounts = await web3.eth.getAccounts();
        courseContract.methods.payForCourse(email).send({ from: accounts[0], value: web3.utils.toWei(courseFee, 'ether') })
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
            <br/>
            <h1>Registration</h1>
            <p>Fee: {courseFee} ETH</p>
            <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <button onClick={payForCourse}>Fund</button>
        </div>
    );
};










