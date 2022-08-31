/*
* GenericResponse
* Global or shared types definitions here
* */

interface GenericResponse<T> {
    data: T
    code: number
    message: string
}