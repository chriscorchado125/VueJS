import axios from "axios";

let url = "api/course";

class CourseService {
  static getCourse(searchedFor) {
    return new Promise(async (resolve, reject) => {
      try {
        if (searchedFor) url = url + "?q=" + searchedFor;
        const res = await axios.get(url);
        const data = res.data;
        resolve(data.map((course) => ({ course })));
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default CourseService;
