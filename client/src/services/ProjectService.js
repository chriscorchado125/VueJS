import axios from "axios";

let url = "api/project";

class ProjectService {
  static getProject(searchedFor) {
    return new Promise(async (resolve, reject) => {
      try {
        if (searchedFor) url = url + "?q=" + searchedFor;
        const res = await axios.get(url);
        const data = res.data;
        resolve(data.map((project) => ({ project })));
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default ProjectService;
