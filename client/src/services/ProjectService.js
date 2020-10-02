import axios from "axios";
import getCookie from "./../ts/getCookies";

class ProjectService {
  static getProject(page, dir, search) {
    let url = "api/project";

    if (page) {
      url += "?page=" + page + "&dir=" + dir;
    } else {
      url += "?page=1";
    }

    url += "&first=" + getCookie("firstIDcookie").substring(3, 27);
    url += "&last=" + getCookie("lastIDcookie").substring(3, 27);

    if (search) url += "&q=" + search;

    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(data.map((project) => ({ project })));
      } catch (err) {
        reject(err);
      }
    });
  }

  static getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}

export default ProjectService;
