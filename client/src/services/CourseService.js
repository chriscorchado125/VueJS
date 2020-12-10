import axios from 'axios'
import getCookie from './../ts/getCookie'

class CourseService {
  static getCourse (page, dir, search) {
    let url = 'api/course'

    if (page) {
      url += '?page=' + page + '&dir=' + dir
    } else {
      url += '?page=1'
    }

    url += '&first=' + getCookie('firstIDcookie').substring(3, 27)
    url += '&last=' + getCookie('lastIDcookie').substring(3, 27)

    if (search) url += '&q=' + search

    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url)
        const data = res.data
        resolve(data.map((course) => ({ course })))
      } catch (err) {
        reject(err)
      }
    })
  }
}

export default CourseService
