import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export type ResponseData = {
  curso: string;
  instrutor: string;
};

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  res.status(200).json({ curso: 'next.js', instrutor: 'Dev Soutinho' });
  console.log("ola");
}

export default handler;