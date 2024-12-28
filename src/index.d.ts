
declare global{
    namespace Express{
        interface Request{
            user: user | null
        }
    }
}

export type user = {
    _id: string,
    username:string,
    email: string
}