import React from 'react'
import Form from '../components/Form'
import img from '../assets/img2.png'

export const Login = () => {
  return (
    <div className='flex w-full h-screen'>
        <div className='w-full flex items-center justify-center lg:w-1/2'>
            <Form/>
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