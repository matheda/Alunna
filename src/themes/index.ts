const { dark } = require('./dark')
const { light } = require('./light')

export const colors = true ? { ...light } : { ...dark };
