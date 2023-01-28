import {NextApiRequest, NextApiResponse} from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {name, surname} = req.body;

    // prisma.user.create({
    const {login, password} = req.body;
    console.log(login, password)
    res.status(200).json(JSON.stringify(req.body))
}