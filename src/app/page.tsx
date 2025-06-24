'use client'
import { IPSummary } from '@/components/IPSummary'
import { columns } from '@/components/IpTable/Columns'
import { DataTable } from '@/components/IpTable/DataTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { searchIp, searchIpState } from '@/lib/actions'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useActionState, useEffect, useState } from 'react'

import dynamic from 'next/dynamic';
import { toast } from 'sonner'
const MapClient = dynamic(() => import('@/components/Map'), { ssr: false });

const page = () => {
  const initialState: searchIpState = {
    errorMessage: '',
    data: undefined,
  };

  const [state, formAction, isPending] = useActionState(searchIp, initialState)
  const [data, setData] = useState([])

  const queryClient = useQueryClient()

  const getIps = async () => {
    const res = await fetch('/api/getAllIps')
    setData(await res.json())
  }

  useQuery({
    queryKey: ['ips'],
    queryFn: getIps
  })

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['ips']
    })

    if(state.errorMessage === 'IP duplicada') {
      toast.warning(state.errorMessage + ' no se agregara a la base de datos')
    }

  }, [state])

  return (
    <main className='grid place-items-center h-full gap-8 w-screen pt-20'>
      <form action={formAction} className='flex gap-4'>
        <Input name="ip" placeholder="Ingresa una IP..." className="max-w-xs" required />
        <Button type="submit" disabled={isPending}>Buscar</Button>
      </form>
      {state.data &&
        <>
          <div className='p-4 max-w-full'>
            <IPSummary data={state.data} />
          </div>
          <div>
            <MapClient position={[state.data?.lat, state.data?.lon]} />
          </div>
        </>
      }
      <div className='scroll-auto max-w-screen p-4'>
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  )
}

export default page
