import axios from "axios";

const url = "https://chriscorchado.com/drupal8/contact/feedback";

class ContactService {
  static getContact() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve({ data });
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default ContactService;
