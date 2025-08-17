import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'


const BASE_URL = 'toy/'
const LABELS = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered',
]
export const toyService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
    getEmptyToy,
    getDashboardData,
    getLabels


}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)

}
function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}
function getEmptyToy() {
    const toy = {
        name: '',
        price: '',
        inStock: true,
        labels: []
    }
    return toy
}


function getDefaultFilter() {
    return { txt: '', status: '', labels: [], sort: '' }
}

function getDashboardData() {
    return httpService.get('dashboard')


}

function getLabels(){
    return LABELS
}