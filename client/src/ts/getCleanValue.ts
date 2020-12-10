/**
 * Sanatize string
 * @param {string} string - string value
 * @return {string} - string without special characters
 */
const getCleanValue = async (val: string) => {
  return val.replace(/(<([^>]+)>)/gi, '')
}

export default getCleanValue
