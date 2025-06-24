"use server"

import { IPResponse } from "@/types/ip";
import { sql } from "./db";
import { toast } from "sonner";

export type searchIpState = {
  errorMessage?: string
  data?: IPResponse
} 

export async function searchIp(prevState: searchIpState, formData: FormData): Promise<searchIpState> {
  const ip = formData.get("ip")?.toString().trim()

  if (!ip) return prevState

  const registers = await sql`SELECT * FROM ip_queries WHERE ip = ${ip}`
  if (registers.length > 0) {
    return {
      errorMessage: 'IP duplicada',
      data: registers[0] as IPResponse
    }
  }

  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,lat,lon,isp,query,zip`);
    const data = await response.json();
    await sql`
      INSERT INTO ip_queries (ip, country, region, city, isp, lat, lon, zip)
      VALUES(${data.query}, ${data.country}, ${data.regionName}, ${data.city}, ${data.isp}, ${data.lat}, ${data.lon}, ${data.zip})
    `
    return {
      data: data
    }
  } catch(error) {
    return {
      errorMessage: error as string
    }
  }
}

export async function getAllIps(): Promise<IPResponse[]> {
  return await sql`SELECT * FROM ip_queries ORDER BY queried_at DESC` as IPResponse[]
}

export async function deleteIp(id: number) {
  return await sql`DELETE FROM ip_queries WHERE id=${id}`
}
