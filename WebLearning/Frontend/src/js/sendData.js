export let sendData = (url='', body={}, method='POST', headers={
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}) => {
return fetch(url, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, cors, *same-origin
      // cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'include', // include, *same-origin, omit
      headers: headers,
      body: JSON.stringify(body),  
  })
}