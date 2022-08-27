import {
    apiHost,
    apiVersion
} from "../config/environments";

interface Data {
    type: string
    id: string
    attributes: any
    relationships: any
    links: any
}

export interface JSONResponse {
    links: any
    data: Data[]
    included: any
}

function buildResponseData<T>(responseData: T, type: string): Data[] {

    const buildData = (res: T | any) => {
        return {
            type: type,
            id: res.id,
            attributes: res,
            links: {
                self: `${apiHost}/api/${apiVersion}/${type}/${res.id}`
            },
            relationships: {} // TODO: append data associations here
        }
    }

    return Array.isArray(responseData)
        ? responseData.map(each => buildData(each))
        : [buildData(responseData)]

}

export function buildResponse<T>(data: T, type: string) {
    return {
        links: {},
        data: buildResponseData<T>(data, type),
        included: {}
    }
}
