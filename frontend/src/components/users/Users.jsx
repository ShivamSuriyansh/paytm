
import { useNavigate } from "react-router-dom"


const Users = ({user,index}) => {
    const navigate = useNavigate();
  return (  
    <div className='flex justify-between items-center gap-4'>
        <div className='flex justify-start items-center gap-[2  .2rem]'>

        
            <section className='icon p-2 flex justify-center items-center'>
                <div className=" bg-green-400 h-[3rem] w-[3rem] rounded-full flex justify-center items-center">
                    <div className=' bg-slate-300 rounded-full p-4 w-fit'>
                        <span className="  font-semibold">U{index}</span>
                    </div>
                </div>
            </section>
            <section className='name'>
                <span>{user.firstName} {user.lastName}</span>
            </section>
        </div>
        <div >
            <section className='button bg-black text-white rounded-lg p-2' onClick={()=>navigate('/send')}>Send Money</section>
        </div>
    </div>
  )
}

export default Users