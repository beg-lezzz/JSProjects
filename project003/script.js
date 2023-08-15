
const urlAPI = 'https://jsonplaceholder.typicode.com/users';

const getDataFromAPI = async (urlAPI) => {
    const res = await fetch(urlAPI);
    return await res.json();
};

try {
    const users = await getDataFromAPI(urlAPI);
    localStorage.setItem('users', JSON.stringify(users));
} catch (e) {
    console.error(e);
}

const localUsers = JSON.parse(localStorage.getItem('users'));
console.log(localUsers);

const div = document.querySelector('.wrapper');

let counter = 0;
localUsers.forEach((user) => {
    const userCard = document.createElement('div');
    userCard.classList.add('user-card');
    userCard.id = `${user.id}`;
    const userCardInfo = document.createElement('div');
    userCardInfo.classList.add('user-card-info');
    const cardButtons = document.createElement('div');
    cardButtons.classList.add('card-buttons');
    userCard.append(userCardInfo);
    userCard.append(cardButtons);

    for (const userKey in user) {
        if (userKey === 'name' || userKey === 'phone' || userKey === 'username') {
            userCardInfo.insertAdjacentHTML('beforeend',
                `<p class="user-info"> ${userKey}: ${user[userKey]}</p>`);
        }
    }
    cardButtons.insertAdjacentHTML('beforeend',
        `<button id="${user.id}" class="delete-button card-button">Delete user</button>`);
    cardButtons.insertAdjacentHTML('beforeend',
        `<button id="${user.id}" class="info-button card-button">Show more</button>`);
    div.append(userCard);
})

const rec = (arg) => {
    if (typeof arg !== 'object') {
        return arg;
    } else {
        return rec(arg);
    }
}

let buttonsDeleteArray = document.querySelectorAll('.delete-button');
buttonsDeleteArray.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        btn.closest('.user-card').remove();
        const index = localUsers.findIndex(n => Number(n.id) === Number(btn.closest('.user-card').id));
        if (index !== -1) {
            localUsers.splice(index, 1);
        }
        localStorage.setItem('users', JSON.stringify(localUsers));
    })
})

let buttonsInfoArray = document.querySelectorAll('.info-button');
buttonsInfoArray.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        const index = localUsers.findIndex(n => Number(n.id) === Number(btn.closest('.user-card').id));
        if (index === -1) {
            return;
        }
        const popUp = document.createElement('div');
        popUp.classList.add('popup');
        const cross = document.createElement('div');
        cross.textContent = "X";
        cross.classList.add('cross');
        popUp.append(cross);
        const userFullInfo = document.createElement('div');
        userFullInfo.classList.add('user-popup-info');
        popUp.append(userFullInfo);
        userFullInfo.insertAdjacentHTML('beforeend',
            `<h2 class="full-user-info">Full user info</h2>`);
        div.append(popUp);

        const PopUpUser = localUsers[index];

        for (const userKey in PopUpUser) {
            if (userKey !== 'id') {
                if (typeof PopUpUser[userKey] === 'object') {
                    userFullInfo.insertAdjacentHTML('beforeend',
                        `<p class="user-info">${userKey}: </p>`);
                    userFullInfo.insertAdjacentHTML('beforeend',
                        `<p class="user-info">${Object.values(PopUpUser[userKey])}</p>`);
                } else {
                    userFullInfo.insertAdjacentHTML('beforeend',
                        `<p class="user-info"> ${userKey}: ${PopUpUser[userKey]}</p>`
                    )
                }
            }
        }
        const closeCross = document.querySelector('.cross');
        window.onscroll = () => {
            window.scroll(0, 0);
        };
        closeCross.addEventListener('click', (event) => {
            window.onscroll = () => {
            };
            closeCross.parentElement.remove();
        })
    })
})