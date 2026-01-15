import type { NextApiRequest, NextApiResponse } from 'next';

// fake data
import products from '../../utils/data/products';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // fake loading time
  await new Promise(resolve => setTimeout(resolve, 800));
  
  res.status(200).json(products);
}
