const imageContainer = document.getElementById('image-container')

const loader = document.getElementById('loader')
let photosArray = []
let ready = false
let imagesLoaded = 0

let totalImages = 0
const apiKey = ''
const count = 30
const uriApi = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`


function imageLoaded() {

    imagesLoaded++
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
        ready = true
        loader.hidden = true


    }
}

// Helper function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key])
    }


}


// Create elements for links and photos
function displayPhotos() {
    imagesLoaded = 0
    totalImages = photosArray.length
    console.log('tital images ', totalImages)

    photosArray.forEach(photo => {
        // create <a> to link to Unsplash 
        const item = document.createElement('a')
            // item.setAttribute('href', photo.links.html)
            // item.setAttribute('target', '_blank')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',

        })

        // crate <img>
        const img = document.createElement('img')
            // img.setAttribute('src', photo.urls.regular)
            // img.setAttribute('alt', photo.alt_description)
            // img.setAttribute('title', photo.alt_description)
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            titles: photo.alt_description,
        })

        // Event Listener when is finished loading 

        img.addEventListener('load', imageLoaded)

        // put image insade <a>, then put bouth insade image container

        item.appendChild(img)
        imageContainer.appendChild(item)

    })

}

// get photos from Unsplash Api
async function getPhotos() {

    try {
        const response = await fetch(uriApi)
        photosArray = await response.json()


        // console.log(photosArray)
        displayPhotos()

    } catch (error) {
        // cath Error

    }



}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos()



    }
})


// on Load
getPhotos()