import download from '../assets/download.png'
import { downloadImage } from '../utils'

const Card = ({ _id, name, prompt, photo}) => {
  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card'>
      <img className='w-full h-auto object-cover rounded-xl'
            src={photo}
            alt='post'
      />
      <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md'>
        <p className='text-[#fff] text-md overflow-y-auto prompt'>{prompt}</p>
        <div className='mt-5 gap-2 flex justify-between items-center'>
          <div className='flex gap-2 items-center'>
            <div className='w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center text-white items-center text-xs font-bold'>
                {name[0]}
            </div>
            <p className='text-[#fff] text-sm'>{name}</p>
          </div>
          <button type='button' onClick={() => downloadImage(_id, photo)} className='outline-none bg-transparent border-none'>
              <img src={download} alt='download' className='w-6 h-6 invert object-contain'/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card