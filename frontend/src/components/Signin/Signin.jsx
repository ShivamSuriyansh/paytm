import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const Signin = () => {

  const [username , setUsername ] = useState('');
  const [password , setPassword ] = useState('');

  useEffect(()=>{
    let timer = setTimeout(()=>{
      
    },1000);

    return ()=>{
      clearTimeout(timer);
    }
  },[username,password]);

  const handlePassword = (e)=>{
    setPassword(e.target.value);
  }
  const handleUsername = (e)=>{
    setUsername(e.target.value);
  }

  const navigate= useNavigate();

  const handleSignin = async ()=> {
    const isValidEmail =/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if(!username.match(isValidEmail)){
      alert('Please Enter a valid Email!!');
      return;
    }
    const res =await axios.post('http://localhost:4000/api/v1/user/signin', {
      username: username,
      password: password,
    });
    localStorage.setItem('token',res.data.token);
    console.log('token: ',localStorage.getItem('token'));
  

    const currUsers = await axios.get(`http://localhost:4000/api/v1/user/bulk?filter=${username}`);
    console.log('#########: res: ',currUsers.data);
    localStorage.setItem('user',JSON.stringify(currUsers.data.user[0]));

    navigate('/dashboard');
  }
  

  return (
    <div className="container flex justify-center bg-gray-400 h-[44rem] items-center">
      <div className="card  bg-white h-[40rem] w-[25rem] rounded-lg shadow-lg p-10">
        <section className="header flex flex-col gap-5 justify-center items-center mb-5">
          <span className=" font-bold text-4xl">Sign In</span>
          <span className=' text-slate-500 font-semibold text-center'>Enter your credentials to access your Account</span>
        </section>

        <section className="body p-2 flex flex-col gap-2 ">
          <div className='flex flex-col gap-1 justify-center items-start'>
            <label htmlFor="FirstName" className=' font-bold'>sername: </label>
            <input className="mt-1 p-1 border border-gray-500 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full"  value={username} type="text" onChange={handleUsername} placeholder="John" id='FirstName'/>
          </div>
          <div className='flex flex-col gap-1 justify-center items-start'>
            <label htmlFor="password" className=' font-bold'>Password: </label>
            <input className="mt-1 p-1 border border-gray-500 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full"  value={password} onChange={handlePassword} type="password"  id='password'/>
          </div>
          
        </section>

        <section className="footer mt-5 flex flex-col items-center gap-3">
          <button className=' font-semibold bg-gray-950 text-white border-black border p-2 w-full rounded-md hover:bg-black hover:text-white' onClick={handleSignin} >Sign In</button>
          <span>Dont have an Account ?<a className='underline ' onClick={()=>navigate('/signup')} >SignUp</a></span>
        </section>
      </div>

    </div>
  )
}

export default Signin