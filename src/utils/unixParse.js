import moment from "moment"

export const getDateTime = (dt, formatString) => {

    return moment.unix(dt).format(formatString)
}