import axios from 'axios'
const url = 'api/home'

/* eslint no-async-promise-executor: "off" */
class HomeService {
  static getHome () {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url)
        const data = res.data
        resolve(data.map((home) => ({ home })))
      } catch (err) {
        reject(err)
      }
    })
  }
}

export default HomeService
