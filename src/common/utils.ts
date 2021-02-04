

export const isEmailValid = (email: string) => {
    if(process.env.NODE_ENV === 'development') return true

    return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)
}