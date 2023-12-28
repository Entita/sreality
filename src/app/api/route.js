import { NextResponse } from 'next/server'
import axios from 'axios'
// import Jackpot from '@/app/models/Jackpot';
// import dbConnect from '@/utils/dbConnect'

// dbConnect()

// const createJackpot = async (data) => {
//   return await Jackpot(data).save();
// };

export async function GET(req) {
  let query = req.nextUrl.search
  if (query.includes('count')) {
    query = query.replaceAll('%2F', '/')
    query = query.replaceAll('%3F', '?')
    query = query.replaceAll('?/count', '/count')
  }
  const sRealityUrl = `https://www.sreality.cz/api/cs/v2/estates${query}&locality_country_id=112`
  console.log(sRealityUrl)
  const data = await axios({
    method: 'GET',
    url: sRealityUrl,
  })

  return NextResponse.json(data?.data)
}

export async function POST(req) {
  const { phrase } = await req.json()
  const sRealityUrl = `https://www.sreality.cz/api/v1/localities/suggest?category=region_cz,district_cz,municipality_cz,ward_cz,quarter_cz,street_cz&limit=10&locality_district_id=&locality_region_id=&phrase=${phrase}`
  const data = await axios({
    method: 'GET',
    url: sRealityUrl,
  })

  return NextResponse.json(data?.data.results)
}
