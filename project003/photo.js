const urlAPI = 'https://dog.ceo/api/breeds/image/random ';

const getDataFromAPI = async (urlAPI) => {
    const res = await fetch(urlAPI);
    return res.json();
};

const writeTo = async (urlAPI) => {
    try {
        let photos = await getDataFromAPI(urlAPI);
        return photos.message;
    } catch (e) {
        console.error(e);
    }
}

let count = 0;

let dogImg = document.querySelector('.dog-img')
console.log(dogImg);

let dogImgArray = [];

let interval = setInterval(async () => {
    if (count === 9) {
        clearInterval(interval)
        arrayRound();
    }
    count === 9 ? clearInterval(interval) : null;
    let res = await writeTo(urlAPI)
    dogImg.src = res;
    dogImgArray.push(res);
    count++;
}, 3000)

const arrayRound = () => {
    let counter = 0;
    setInterval(() => {
        dogImg.src = dogImgArray[counter]
        counter === 9 ? counter = 0 : counter ++
    }, 3000)
}