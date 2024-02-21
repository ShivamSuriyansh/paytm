
import { useNavigate } from "react-router-dom"


const Users = ({user,index}) => {
    const navigate = useNavigate();
  return (  
    <div className='flex justify-between items-center gap-4'>
        <div className='flex justify-start items-center gap-[2  .2rem]'>
            <section className='icon'>
                <div className=' bg-slate-300 rounded-full p-4 w-fit'>U{index}</div>
            </section>
            <section className='name'>
                <span>{user.username}</span>
                <span>{user.balance}</span>
            </section>
        </div>
        <div >
            <section className='button bg-black text-white rounded-lg p-2' onClick={()=>navigate('/send')}>Send Money</section>
        </div>
    </div>
  )
}

export default Users