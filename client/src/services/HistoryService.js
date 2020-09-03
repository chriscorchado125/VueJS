import axios from "axios";

let url = "api/history";

class HistoryService {
  static getHistory(searchedFor) {
    return new Promise(async (resolve, reject) => {
      try {
        if (searchedFor) url = url + "?q=" + searchedFor;
        const res = await axios.get(url);
        const data = res.data;
        resolve(data.map((history) => ({ history })));
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default HistoryService;
