
import {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'



const Signup = () => {

  const [name , setName] = useState('');
  const [lastName , setLastName] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');


  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // console.log('debounced value name:', name);
      // console.log('debounced value lastName:', lastName);
      // console.log('debounced value Email:', email);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [name,lastName,email,password]);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e)=>{
    setPassword(e.target.value);
  }

  const handleSignIn = async ()=>{
    const isValidEmail =/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if(!email.match(isValidEmail)){
      alert('Please Enter a valid Email!!');
      return;
    }
    const response = await axios.post('http://localhost:4000/api/v1/user/signup',{
      "username" : email,
      "firstname" : name,
      "lastname" : lastName,
      "password" : password
    })
    console.log(response.data);
    localStorage.setItem("token",response.data.token);
    navigate('/dashboard');
  }
  

  return (
    <div className="container flex justify-center bg-gray-400 h-[44rem] items-center">
      <div className="card  bg-white h-[40rem] w-[25rem] rounded-lg shadow-lg p-10">
        <section className="header flex flex-col gap-5 justify-center items-center mb-5">
          <span className=" font-bold text-4xl">Sign Up</span>
          <span className=' text-slate-500 font-semibold'>Enter your information to create an account</span>
        </section>

        <section className="body p-2 flex flex-col gap-2">
          <div className='flex flex-col gap-1 justify-center items-start'>
            <label htmlFor="FirstName" className=' font-bold'>FirstName: </label>
            <input className="mt-1 p-1 border border-gray-500 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full" type="text" placeholder="John" value={name} onChange={handleName} id='FirstName'/>
          </div>
          <div className='flex flex-col gap-1 justify-center items-start'>
            <label htmlFor="LasttName" className=' font-bold'>LastName: </label>
            <input className="mt-1 p-1 border border-gray-500 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full" type="text" placeholder="Doe" value={lastName} onChange={handleLastName} id='LastName'/>
          </div>
          <div className='flex flex-col gap-1 justify-center items-start'>
            <label htmlFor="Email" className=' font-bold'>Email: </label>
            <input className="mt-1 p-1 border border-gray-500 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full" type="text" placeholder="johndoe@gmail.com" value={email} onChange={handleEmail} id='Email'/>
          </div>
          <div className='flex flex-col gap-1 justify-center items-start'>
            <label htmlFor="passowrd" className=' font-bold'>Password: </label>
            <input className="mt-1 p-1 border border-gray-500 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full" type="password"  value={password} onChange={handlePassword} id='password'/>
          </div>
        </section>

        <section className="footer mt-5 flex flex-col items-center">
          <button className=' font-semibold bg-gray-950 text-white border-black border p-2 w-full rounded-md hover:bg-black hover:text-white' onClick={handleSignIn}>Sign Up</button>
          <span>Already a user ?<a className='underline ' onClick={()=>navigate('/signin')}>login</a></span>
        </section>
      </div>

    </div>
  )
}

export default Signup;