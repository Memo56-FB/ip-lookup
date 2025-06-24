'use client'
import { IPSummary } from '@/components/IPSummary'
import { columns } from '@/components/IpTable/Columns'
import { DataTable } from '@/components/IpTable/DataTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { searchIp, searchIpState } from '@/lib/actions'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { startTransition, useActionState, useEffect, useState } from 'react'

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
  }, [state])

  return (
    <main className='grid place-items-center h-full'>
      <form action={formAction} className='flex gap-4'>
        <Input name="ip" placeholder="Ingresa una IP..." className="max-w-xs" required />
        <Button type="submit" disabled={isPending}>Buscar</Button>
      </form>
      {state.data &&
        <IPSummary data={state.data} />
      }
      <DataTable columns={columns} data={data} />
    </main>
  )
}

export default page
