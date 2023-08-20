import { NextApiRequest, NextApiResponse } from 'next'
import { getChoreData } from '@/lib/chores';

export default async function  handler(_: NextApiRequest, res: NextApiResponse) {
  const chores = await getChoreData('2');
  res.json(chores);
}
