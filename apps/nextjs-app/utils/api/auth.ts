import {fetcher} from "@/utils/api/fetcher";

export const register = (user: any) => fetcher('/api/register', 'POST', user)

export const signIn = (user: any) => fetcher('/api/signin', 'POST', user)