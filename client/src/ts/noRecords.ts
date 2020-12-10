/**
 * Handle no records
 * @param {string} noRecordID - id of div to create
 * @param {string} searchedFor - searched for text
 * @param {string} appendToID - id of element to append to
 * @param {string} msg - message
 */
const noRecordsFound = (
  noRecordID: string,
  searchedFor: string,
  appendToID: string,
  msg: string
): void => {
  if (searchedFor == '') {
    const noRecordMsg = document.getElementById(noRecordID) as HTMLElement
    if (noRecordMsg) {
      noRecordMsg.remove()
    }

    // Show the content container
    document.getElementsByClassName('container')[0].classList.remove('hide')
  } else {
    // Hide the content container
    document.getElementsByClassName('container')[0].classList.add('hide')

    // Create a div with the error
    const notFound = document.createElement('div')
    notFound.id = noRecordID
    notFound.innerHTML = `${msg} '${searchedFor}'`

    // Add error message
    const appendToEL = document.getElementById(appendToID) as HTMLElement
    appendToEL.appendChild(notFound)
  }
}

export default noRecordsFound
