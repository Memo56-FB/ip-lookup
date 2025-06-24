import { IPResponse } from '@/types/ip'
import React from 'react'

export const IPSummary = ({ data } : { data: IPResponse}) => {
  return (
    <section className='grid gap-4 border border-gray-300 rounded px-6 py-4 [&>div:nth-child(odd)]:bg-gray-200 [&>div]:p-3 [&>div]:rounded'>
      <h2 className='text-2xl font-bold'>Resumen</h2>
      <div className='flex flex-col md:flex-row justify-between gap-4'>
        <p>Codigo Postal:</p>
        <p>{data?.zip}</p>
      </div>
      <div className='flex flex-col md:flex-row justify-between gap-4'>
        <p>Pais:</p>
        <p>{data?.country}</p>
      </div>
      <div className='flex flex-col md:flex-row justify-between gap-4'>
        <p>Región:</p>
        <p>{data?.region || data?.regionName}</p>
      </div>
      <div className='flex flex-col md:flex-row justify-between gap-4'>
        <p>Ciudad:</p>
        <p>{data?.city}</p>
      </div>
      <div className='flex flex-col md:flex-row justify-between gap-4'>
        <p>Latitud:</p>
        <p>{data?.lat}</p>
      </div>
      <div className='flex flex-col md:flex-row justify-between gap-4'>
        <p>Longitud:</p>
        <p>{data?.lon}</p>
      </div>
      <div className='flex flex-col md:flex-row justify-between gap-4'>
        <p>Proveedor (ISP):</p>
        <p>{data?.isp}</p>
      </div>
    </section>
  )
}
