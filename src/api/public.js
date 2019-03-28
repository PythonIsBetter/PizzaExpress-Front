import axios from 'axios'

axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'
export default {
  fetchGet (url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, params).then(res => {
        resolve(res.data)
        console.log(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // fetchGet (url, params) {
  //   axios.get(url, params)
  //     .then(function (response) {
  //       console.log(response)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // },

  fetchPost (url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        console.log(res)
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
