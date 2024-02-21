import { useEffect, useState } from "react"
import Users from "../users/Users"
import axios from "axios";

const Dashboard = () => {
  const [users,setUsers] = useState([]);
  const [filter , setFilter] = useState('');
  const [balance , setBalance] = useState('');

  useEffect(()=>{
    const users =axios.get('http://localhost:4000/api/v1/user/bulk?filter='+filter)
    .then(res=>{
      setUsers(res.data.user);
    })

    const currentBalance = axios.get('http://localhost:4000/api/v1/account/balance',{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then(res=>{
      setBalance(res.data.balance);
    })
    console.log('Users: ',users,'Balance: ',currentBalance);
  },[filter,balance]);

  const handleFilter = (e)=>{
    setFilter(e.target.value);
  }
  
  return (
    <div className="container px-[10rem] py-[2.5rem]">  
      <section className="header border-b-2 py-4">
        <div className="flex justify-between ">
          <h1 className=" text-2xl font-bold ">Payments App</h1>
          <div className="user-profile flex gap-2 justify-center items-center  font-semibold ">
            <span>Hello, User</span>
            <span className=" rounded-full p-4 h-0.5 w-0.5 bg-slate-200 cursor-pointer"></span>
          </div>
        </div>
      </section>
      <section className="subheader mt-8 mb-10">
        <div className="flex flex-cols font-bold text-xl gap-3">
          <span className=" font-bold">Your Balance: {balance} </span>
        </div>
      </section>
      <section className="users-filter">
        <div className=" font-bold flex flex-col justify-center gap-8">
          <span className="text-2xl ">USERS</span>
          <input type="text" className=" border rounded-md border-slate-400 p-2  " placeholder="Search users" value={filter} onChange={handleFilter}/>
        </div>
      </section>
      <section className="users-list">
        {/* api call needed */}
        {users.map((u,i)=>(
          <Users key={i} user={u} index={i}/>
        ))}
      </section>
    </div>
  )
}

export default Dashboard