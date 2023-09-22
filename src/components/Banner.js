import React, { useState } from 'react'
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const data = [
        "https://res.cloudinary.com/dvvzlx2na/image/upload/v1688169203/World%20of%20Warcraft%20-%20Items/Sliders/wow-canvas-art-banners-carousel-desktop-RD02-1600x5000_kfbcd8.webp",
        "https://res.cloudinary.com/dvvzlx2na/image/upload/v1688167368/World%20of%20Warcraft%20-%20Items/Sliders/WoW_JuneTransmog_BnetHeader_1600x5000_B03_qzcrb0.webp",
        "https://res.cloudinary.com/dvvzlx2na/image/upload/v1688168545/World%20of%20Warcraft%20-%20Items/Sliders/BG_Accolades22_uwsjzb.webp",
    ];

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1)
    };
    const nextSlide = () => {
        setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1)
    };
  return (
    <div className='w-full h-auto overflow-hidden'>
        <div className='w-screen lg:h-[450px] xl:h-[550px] relative'>
            <div style={{transform: `translateX(-${currentSlide * 100}vw)`}} className='w-[300vw] flex transition-transform duration-1000'>
                <img className=" max-md:hidden w-screen h-full object-contain" src={data[0]} alt="ImgOne" loading="priority"/>
                <img className=" max-md:hidden w-screen h-full object-contain" src={data[1]} alt="ImgTwo"/>
                <img className=" max-md:hidden w-screen h-full object-contain" src={data[2]} alt="ImgThree"/>
                <img id='banner-mov'
            className=" hidden w-screen h-full object-contain max-md:block "
            src="https://res.cloudinary.com/dvvzlx2na/image/upload/v1688173833/World%20of%20Warcraft%20-%20Items/Sliders/WoW_SummerSale2023_Bnet_HeaderMobile_928x40045_oankch.jpg"
            alt="cartImg"
          />
            </div>
          <div className="max-md:hidden w-full mx-auto flex justify-center bottom-8 lg:bottom-28 xl:bottom-32 gap-8 absolute inset-x-0 h-1">
          <div
            onClick={prevSlide}
            className="w-14 h-12 max-lg:w-8 max-lg:h-8 border-[1px] bg-black border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300"
          >
            <HiArrowLeft className='text-white'/>
          </div>
          <div
            onClick={nextSlide}
            className="w-14 h-12 max-lg:w-8 max-lg:h-8 border-[1px] bg-black border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300"
          >
            <HiArrowRight className='text-white'/>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Banner