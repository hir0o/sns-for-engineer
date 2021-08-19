export const getOffsetString = (dt1: Date, dt2: Date) => {
  const offsetTs = dt1.getTime() - dt2.getTime()

  if (offsetTs < 10000) {
    return '今'
  } else if (offsetTs < 60000) {
    return `${Math.floor(offsetTs / 1000)}秒前`
  } else if (offsetTs < 3600000) {
    return `${Math.floor(offsetTs / 60000)}分前`
  } else if (offsetTs < 86400000) {
    return `${Math.floor(offsetTs / 3600000)}時間前`
  } else {
    return `${Math.floor(offsetTs / 86400000)}日前`
  }
}
