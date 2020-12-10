/**
 * Format date string
 * Return only the 4 digit year
 * Return only the name of month  ie. January
 * Return the name of the month plus the 4 digit year
 * @param {string} dateString - date value
 * @param {string} [option] - yearOnly or monthOnly
 * @return {string} - month and year - example: January 2020
 */
const getMonthYear = (dateString: string, option?: string) => {
  const newDate = new Date(dateString)

  if (option === 'yearOnly') {
    return newDate.getFullYear().toString()
  }

  if (option === 'monthOnly') {
    return newDate.toLocaleString('default', { month: 'long' })
  }

  return (
    newDate.toLocaleString('default', { month: 'long' }) +
    ' ' +
    newDate.getFullYear().toString()
  )
}

export default getMonthYear
