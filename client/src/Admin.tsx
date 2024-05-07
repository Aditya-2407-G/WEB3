import {useEffect, useState} from "react";


export function Admin({web3, fundMeContract}: any) {
    const [payments, setPayments] = useState<Payment[]>([]);

    const init = () => {
        if (!web3 || !fundMeContract) return;
        console.log(fundMeContract.methods.payments);

        fundMeContract.methods.getAllPayments().call()
            .then((values: Payment[]) => {
                setPayments(values)
            });
    }

    useEffect(() => {
        if (web3 && fundMeContract) {
            init();
        }
    }, [web3, fundMeContract]);

    return (
        <div>
            <h1>Admin</h1>
            Total {payments.length} people have funded!
            {payments.map(payment => (
                <div key={payment.name}>
                    <p>Name: {payment.name}</p>
                </div>
            ))}
        </div>
    )
}
