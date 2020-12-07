import Axios from "axios"
import {configure} from "axios-hooks"

const axios = Axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1/`,
    headers: {
        'content-type': 'application/json'
    }
})

// Configure `axios-hooks` to use our axios instance
configure({axios})

export default axios
