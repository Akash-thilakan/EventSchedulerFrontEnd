import commonAPI from "./commonAPI"
import SERVERURL from "./ServerUrl"

//addEvents
export const addEventAPI = async(reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/addevent`, reqBody)
}

//getallevnts
export const getAllEventsAPI = async() => {
    return await commonAPI("GET", `${SERVERURL}/getallevents`)
}

export const loginAPI = async(reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/login`, reqBody)
}

export const editEventAPI = async(id, reqBody) => {
    return await commonAPI("PUT", `${SERVERURL}/edit-event/${id}`, reqBody)
}

export const getEventAPI = async(id) => {
    return await commonAPI("GET", `${SERVERURL}/getanevent/${id}`)
}

export const deleteEventAPI = async(id) => {
    return await commonAPI("DELETE", `${SERVERURL}/deleteevent/${id}`)
}