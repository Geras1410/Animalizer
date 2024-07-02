import React from 'react'
import FormReg from '../components/FormReg'
import img from '../assets/img2.png'

const Register = () => {
  return (
    <div className='flex w-full h-screen mt-5 mb-5'>
        <div className='w-full flex items-center justify-center lg:w-1/2'>
            <FormReg/>
        </div>
        <div className='hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200'>
            <img
              src={img}
              alt='Logo Animalizer'
              className='w-60 h-60 object-cover animate-bounce'
            />
            <div className='w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg'/>
        </div>
    </div>
  )
}

export default Register