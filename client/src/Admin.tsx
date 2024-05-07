import {useEffect, useState} from "react";


export function Admin({web3, courseContract}: any) {
    const [payments, setPayments] = useState<Payment[]>([]);

    const init = () => {
        if (!web3 || !courseContract) return;
        console.log(courseContract.methods.payments);

        courseContract.methods.getAllPayments().call()
            .then((values: Payment[]) => {
                setPayments(values)
            });
    }

    useEffect(() => {
        if (web3 && courseContract) {
            init();
        }
    }, [web3, courseContract]);

    return (
        <div>
            <h1>Admin</h1>
            Total {payments.length} people have funded!
            {payments.map(payment => (
                <div key={payment.email}>
                    <p>Email: {payment.email}</p>
                </div>
            ))}
        </div>
    )
}