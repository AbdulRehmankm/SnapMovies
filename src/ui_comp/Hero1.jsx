import React from 'react'
import image1 from "../Data/file-min.png"


const Hero1 = () => {
  return (
    <div className='relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center duration-200'>
   
            <div className='h-[700px] w-[700px] bg-clr4 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-9'>
        </div>
        <div className='pb-8 sm:pb-0 container'>
            <div>
                <div className='grid grid-cols-1 sm:grid-cols-2'>
                    <div className=' flex flex-col justify-center gap-4  text-center sm:text-left order-2 sm:order-1 relative z-10'>
                        <h1 className=' text-3xl sm:text-4xl lg:text-5xl font-bold'>MOVIES & SERIESSS</h1>
                        <p className=' text-sm'>
                        Welcome to SnapMovies.pk
                        <br />
                        SnapMovies: Download Hollywood, Bollywood, and Anime Movies and Series in Hindi Dubbed & Dual Audio | 4K, 1080p, 720p, 480p
                        Enjoy the best in entertainment with SnapMovies, your go-to platform for multi-language movie and series downloads.            
                        </p>
                        <div >
                            <a href="/dynpage/Hollywood"><button className=' bg-gradient-to-r from-clr1 to-clr2 hover:scale-105 duration-200 text-white py-2 px-4 rounded-full mx-2 '>Hollywood</button></a>
                            <a href="/dynpage/Bollywood"><button className=' bg-gradient-to-r from-clr1 to-clr2 hover:scale-105 duration-200 text-white py-2 px-4 rounded-full mx-2 '>Bollywood</button></a>
                            <a href="/dynpage/Anime"><button className=' bg-gradient-to-r from-clr1 to-clr2 hover:scale-105 duration-200 text-white py-2 px-4 rounded-full mx-2 '>Anime</button></a>

                        </div>
                    </div>
                    <div className=' order-1 sm:order-2'>
                       <div className=' relative z-10'>
                          <img src={image1} alt="girl" className=' w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-125 object-contain mx-auto'/>
                      </div>
                        
                    </div>

                </div>
            </div>
        </div>
  
        
    </div>
    
  )
}

export default Hero1
