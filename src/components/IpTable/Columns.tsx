"use client"

import { IPResponse } from "@/types/ip"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<IPResponse>[] = [
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

]