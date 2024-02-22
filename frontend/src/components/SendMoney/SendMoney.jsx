import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
// import { User } from "../../../../backend/db/UserSchema";

const SendMoney = () => {

  const [searchParam] = useSearchParams();
  const id = searchParam.get('id');
  const name = searchParam.get('name');

  const [amount , setAmount ] = useState(0);

  const handleAmount = (e)=>{
    setAmount(e.target.value);
  }


  const transferMoney =async()=>{
    const currentBalance = await axios.post(
      'http://localhost:4000/api/v1/account/transfer',
      {
        "to": id,
        "amount": parseInt(amount)  
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      }
    );
    alert(currentBalance.data.msg);
  }

  return (
  <div className=" bg-gray-100 h-screen flex justify-center items-center">
    <div className=" h-[25rem] w-[30rem] border  bg-white shadow-lg rounded-lg p-8">
      <div className="flex justify-center mb-16 ">
        <span className=" font-extrabold text-3xl mt-2">Send Money</span>
      </div>
      <div className=" flex justify-Start  items-center px-3 gap-4">
          <div className=" bg-green-400 h-[3rem] w-[3rem] rounded-full flex justify-center items-center">
            <span className=" text-2xl font-semibold">{name.charAt(0)}</span>
          </div>
          <span className="text-xl font-bold">{name}</span>
      </div>

      <div className=" p-3 flex flex-col gap-2">
        <label htmlFor="amount" className=' font-bold'>Transfer funds: </label>
        <input className="mt-1 p-1 border border-gray-500 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full" value={amount} onChange={handleAmount} type="number"  id='amount'/>
        <button className=' font-semibold bg-green-500 text-white p-2 w-full rounded-md hover:bg-green-700' onClick={transferMoney} >Initiate Transfer</button>
      </div>
    </div>
  </div>
  )
}
export default SendMoney;