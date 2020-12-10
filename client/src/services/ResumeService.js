import axios from 'axios'

const url = 'api/resume'

class ResumeService {
  static getResume () {
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

export default ResumeService
