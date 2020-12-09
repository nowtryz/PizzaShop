type Session = Partial<{
    userId: any,
    email: string,
    logged: boolean,
}>


export default Session

declare module 'express-session' {
    interface SessionData {
        userId: any,
        email: string,
        logged: boolean,
    }
}
