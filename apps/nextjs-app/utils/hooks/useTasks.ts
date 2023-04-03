import useSWR from 'swr'
import { Task } from '@prisma/client'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const useTasks = () => {
  const { data, error, isLoading, mutate: mutateTasks } = useSWR<Task[]>('/api/task', fetcher)

  return { data: data || [], error, isLoading, mutateTasks }
}

export default useTasks
