const endpoint = 'https://us-central1-fullstackvoyage.cloudfunctions.net/render';
function postData(url = endpoint, data = {}) {
  // Default options are marked with *
  return fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    //body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
}
export async function generateApp() {
  return postData(endpoint);
}