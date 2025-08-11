import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'


const BASE_URL = 'car/'

export const carService = {
    query,
    getById,
    save,
    remove,
    getEmptyCar,
    getDefaultFilter,
    getRandomCar
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(carId) {
    return httpService.get(BASE_URL + carId)

}
function remove(carId) {
    return httpService.delete(BASE_URL + carId)
}

function save(car) {
    if (car._id) {
        return httpService.put(BASE_URL + car._id, car)
    } else {
        return httpService.post(BASE_URL, car)
    }
}


function getEmptyCar() {
    return {
        vendor: '',
        price: '',
        speed: '',
    }
}

function getRandomCar() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
        speed: utilService.getRandomIntInclusive(90, 200),
    }
}


function getDefaultFilter() {
    return { txt: '', maxPrice: '', minSpeed: '' }
}



