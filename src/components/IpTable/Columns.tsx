"use client"

import { IPResponse } from "@/types/ip"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { Router, Trash } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
export const columns: ColumnDef<IPResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: false
  },
  {
    accessorKey: "ip",
    header: "IP"
  },
  {
    accessorKey: "zip",
    header: "Codigo Postal",
  },
  {
    accessorKey: "country",
    header: "Pais",
  },
  {
    accessorKey: "regionName",
    header: "Región",
  },
  {
    accessorKey: "city",
    header: "Ciudad",
  },
  {
    accessorKey: "lat",
    header: "Latitud",
  },
  {
    accessorKey: "lon",
    header: "Longitud",
  },
  {
    accessorKey: "isp",
    header: "Proveedor (ISP)",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const queryClient = useQueryClient()
      const [open, setOpen] = useState(false)

      const deleteIp = async (id: string) => {
        const res = await fetch('api/deleteIp', {
          method: 'DELETE',
          body: JSON.stringify({ id }),
        })
        const data = await res.json()
        if (data.status === 200) {
          setOpen(prev => !prev)
          queryClient.invalidateQueries({
            queryKey: ['ips']
          })
        }
      }

      return (
        <Dialog onOpenChange={setOpen} open={open}>
          <DialogTrigger asChild>
            <Button variant={'destructive'}>
              <Trash />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-center">¿Estas seguro?</DialogTitle>
              <DialogDescription className="text-center">
                Esta acción no se podra deshacer
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-around">
              <DialogClose>
                <Button>
                  Cancelar
                </Button>
              </DialogClose>
              <Button variant={'destructive'} onClick={() => deleteIp(row.original.id)}>
                Borrar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )
    }
  }
]
