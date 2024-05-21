import { useEffect, useState } from "react";

export function Admin({ web3, fundMeContract }: any) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [totalAmount, setTotalAmount] = useState<string>('0');

  const init = () => {
    if (!web3 || !fundMeContract) return;

    fundMeContract.methods
      .getAllPayments()
      .call()
      .then((values: Payment[]) => {
        setPayments(values);
        const total = values.reduce((acc, payment) => {
          return acc + parseFloat(web3.utils.fromWei(payment.amount, 'ether'));
        }, 0);
        setTotalAmount(total.toFixed(2)); // Adjust the decimal places as needed
      });
  };

  useEffect(() => {
    if (web3 && fundMeContract) {
      init();
    }
  }, [web3, fundMeContract]);

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
        Total Support 
      </h1>

      <h2 className="text-lg font-semibold mb-6 text-center text-gray-600">
        Total {payments.length} {payments.length === 1 ? "person has" : "people have"} funded a total of {totalAmount} ETH!
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center bg-gray-100 p-2">
        {payments.map((payment, index) => (
          <div key={index} className="bg-white border border-gray-300 rounded-md shadow-md">
            <div className="p-4">
              <p className="text-lg font-medium text-gray-700">
                Name: {payment.name}
              </p>
              <p className="text-md text-gray-600">
                Amount: {web3.utils.fromWei(payment.amount, "ether")} ETH
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
