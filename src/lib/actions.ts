"use server"

import { IPResponse } from "@/types/ip";
import { sql } from "./db";

export type searchIpState = {
  errorMessage?: string
  data?: IPResponse
} 

async function searchIp(prevState: searchIpState, formData: FormData): Promise<searchIpState> {
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
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,lat,lon,isp,query`);
    const data = await response.json();
    await sql`
      INSERT INTO ip_queries (ip, country, region, city, isp, lat, lon)
      VALUES(${data.query}, ${data.country}, ${data.regionName}, ${data.city}, ${data.isp}, ${data.lat}, ${data.lon})
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

export default searchIp