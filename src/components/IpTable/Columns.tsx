"use client"

import { IPResponse } from "@/types/ip"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { Trash } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
export const columns: ColumnDef<IPResponse>[] = [
  {
    accessorKey: "id",
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

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => console.log(row.original.id)} variant={'destructive'}>
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
              <Button variant={'destructive'}>
                Borrar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )
    }
  }
]
