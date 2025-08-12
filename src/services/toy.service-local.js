
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter
}
_createToys()

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {

            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regExp.test(toy.txt))
            }
            if (filterBy.status !== 'all') {
                toys = toys.filter((toy) => {

                    const sts = toy.inStock ? 'inStock' : 'notInStock'
                    return (filterBy.status === sts)
                })
            }

            if (filterBy.labels.length > 0) {
                
                console.log(filterBy.labels);
                console.log();
                
                toys = toys.filter(toy => toy.labels.some(label => filterBy.labels.includes(label)))
            }

            if (filterBy.sort) {
                if (filterBy.sort === 'name') {

                    console.log('inside')
                    toys = toys.sort((a, b) => a.name.localeCompare(b.name));
                } else if (filterBy.sort === 'createdAt') {
                    toys = toys.sort((a, b) => a.createdAt - b.createdAt);
                } else if (filterBy.sort === 'price') {
                    toys = toys.sort((a, b) => a.price - b.price);
                }
            }
            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        vendor: '',
        price: '',
        speed: '',
    }
}

function getRandomToy() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
        speed: utilService.getRandomIntInclusive(90, 200),
    }
}

function getDefaultFilter() {
    return { txt: '', status: 'all', labels: [] }
}


function _createToys() {
    return storageService.query(STORAGE_KEY).then(toys => {
        if (!toys || !toys.length) {
            const toysToSave = []
            toysToSave.unshift(_createToy('src/assets/img/toy1.jpg'))
            toysToSave.unshift(_createToy('src/assets/img/toy2.jpg'))
            toysToSave.unshift(_createToy('src/assets/img/toy3.jpg'))
            toysToSave.unshift(_createToy('src/assets/img/toy4.jpg'))
            toysToSave.unshift(_createToy('src/assets/img/toy5.jpg'))
            utilService.saveToStorage(STORAGE_KEY, toysToSave)
            return toysToSave
        } else return toys
    })
}

function _createToy(url) {


    const toy = {
        _id: utilService.makeId(),
        name: utilService.makeLorem(2),
        imgUrl: url,
        price: utilService.getRandomIntInclusive(50, 300),
        labels: getLabels(),
        createdAt: Date.now(),
        inStock: utilService.getRandomIntInclusive(1, 10) > 5 ? true : false
    }

    return toy

}



function getLabels() {
    const nums = getRandomThree()
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']
    var lbls = []
    lbls.unshift(labels[nums[0]])
    lbls.unshift(labels[nums[1]])
    lbls.unshift(labels[nums[2]])
    return lbls
}

function getRandomThree() {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7]
    const result = []
    for (let i = 0; i < 3; i++) {
        const randIndex = Math.floor(Math.random() * numbers.length)
        result.push(numbers.splice(randIndex, 1)[0])
    }
    return result
}