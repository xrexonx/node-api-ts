import {
    apiHost,
    apiVersion
} from "../config/environments";

interface Data<T> {
    type: string
    id: string
    attributes: T
    relationships: any
    links: any

}

export interface JSONResponse<T> {
    links: any
    data: Data<T>
}



export function buildResponse(data: any, type: string) {
    return {
        links: {},
        data: {
            type: type,
            id: data.id,
            attributes: data,
            links: {
                self: `${apiHost}/api/${apiVersion}/${type}/${data.id}`
            }
        },
        relationships: {}
    }

}
