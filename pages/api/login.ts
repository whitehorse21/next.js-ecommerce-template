import type { NextApiRequest, NextApiResponse } from 'next';

// fake login
export default (req: NextApiRequest, res: NextApiResponse) => {
  const request = req.body;
  const email = request.email;
  const password = request.password;

  if(email === 'dragonfly4141@outlook.com' && password === 'dragonfly') {
    res.status(200).json({ status: true });
  } else {
    res.status(401).json({ status: false });
  }
}
