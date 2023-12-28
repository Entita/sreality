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
  if (query.includes('count')) query = query.substring(1)
  const sRealityUrl = 'https://www.sreality.cz/api/cs/v2/estates' + query + '&locality_country_id=112'
  console.log(sRealityUrl, query)
  const data = await axios({
    method: 'GET',
    url: sRealityUrl,
  })

  return NextResponse.json(data?.data)
}
