import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/utils/db'
import { verifyToken } from '@/utils/auth'

const task = async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.COOKIE_NAME === undefined) return new Error('COOKIE_NAME is undefined.')
  if (!req.cookies[process.env.COOKIE_NAME]) {
    return res.status(401).json({ error: 'Bad token.' })
  }

  if (req.method === 'POST') {
    const { title, description, status } = req.body

    const token = req.cookies[process.env.COOKIE_NAME] as string
    const user = await verifyToken(token)

    const userId = user.payload.id as number

    const task = await db.task.create({
      data: {
        title: title || 'Untitled',
        status: status || false,
        description: description || null,
        owner: {
          connect: {
            id: userId,
          },
        },
      },
    })

    return res.status(201).json(task)
  }

  if (req.method === 'GET') {
    const token = req.cookies[process.env.COOKIE_NAME] as string
    const user = await verifyToken(token)
    const userId = user.payload.id as number

    const tasks = await db.task.findMany({
      where: {
        owner: {
          id: userId,
        },
      },
    })

    return res.status(201).json(tasks)
  }

  if (req.method === 'PUT') {
    const { id, title, description, status } = req.body

    const token = req.cookies[process.env.COOKIE_NAME] as string

    const user = await verifyToken(token)

    if (!user) {
      return res.status(401).json({ error: 'Bad token.' })
    }

    const task = await db.task.update({
      where: {
        id: id,
      },
      data: {
        status: status,
        title: title,
        description: description,
        updatedAt: new Date(),
      },
    })

    return res.status(201).json({ message: `${task.id} updated with ${task.status}` })
  }

  if (req.method === 'DELETE') {
    const id = req.body.id

    const token = req.cookies[process.env.COOKIE_NAME] as string

    const user = await verifyToken(token)

    if (!user) {
      return res.status(401).json({ error: 'Bad token.' })
    }

    console.warn('id', id, req.body)

    if (!id) return res.status(400).json({ error: `Bad id ${id}.` })

    try {
      const task = await db.task.delete({
        where: {
          id: id,
        },
      })
      return res.status(201).json(task.id)
    } catch (error) {
      return res.status(400).json({ error: `Task with id: ${id} not found.` })
    }
  }

  res.status(405).json({ error: `Method ${req.method} not allowed.` })
}

export default task
