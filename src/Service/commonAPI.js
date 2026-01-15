import axios from "axios";

const commonAPI = async(httpRequest, url, reqBody, reqHeader) => {
    const reqConfig = {
        method: httpRequest,
        url,
        data: reqBody,
        headers: reqHeader
    };

    try {
        const response = await axios(reqConfig);
        return response;
    } catch (error) {
        throw error;
    }
};

export default commonAPI;