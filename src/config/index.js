export const basicConfig = {
    API_HOST: 'http://apit.fruitswl.com/api'
}

let _host = window.location.host

if(_host === 'localhost:8089') {
    // basicConfig.API_HOST = 'http://192.168.1.225/api'
    basicConfig.API_HOST = 'http://192.168.31.32/api'
}
