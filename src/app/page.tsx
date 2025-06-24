'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import searchIp, { searchIpState } from '@/lib/actions'
import React, { useActionState, useEffect } from 'react'

const page = () => {
  const initialState: searchIpState = {
    errorMessage: '',
    data: undefined,
  };

  const [state, formAction, isPending] = useActionState(searchIp, initialState)

  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <main className='grid place-items-center h-full'>
      <form action={formAction} className=''>
        <Input name="ip" placeholder="Ingresa una IP..." className="max-w-xs" required />
        <Button type="submit" disabled={isPending}>Buscar</Button>
      </form>

    </main>
  )
}

export default page
