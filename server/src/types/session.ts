type Session = Partial<{
    id: any,
    email: string,
    logged: boolean,
}>


export default Session

declare module 'express-session' {
    interface SessionData {
        id: any,
        email: string,
        logged: boolean,
    }
}
