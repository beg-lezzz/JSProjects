
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
    userCard.id = `${user.id}`;
    for (const userKey in user) {
        // console.log(userKey)
        if (userKey !== 'id') {
            if (typeof user[userKey] === 'object') {
                userCard.insertAdjacentHTML('beforeend',
                    `<p class="user-card">${userKey}: </p>`);
                userCard.insertAdjacentHTML('beforeend',
                    `<p class="user-card">${Object.values(user[userKey])}</p>`);
            } else {
                userCard.insertAdjacentHTML('beforeend',
                    `<p class="user-card"> ${userKey}: ${user[userKey]}</p>`
                )
            }
        }
    }
    userCard.insertAdjacentHTML('beforeend',
        `<button id="${user.id}" class="delete-button">Delete user</button>`)
    div.append(userCard);
})

const rec = (arg) => {
    if (typeof arg !== 'object') {
        return arg;
    } else {
        return rec(arg);
    }
}

let buttonsArray = document.querySelectorAll('button');
buttonsArray.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        // document.getElementById(btn.id).remove();
        console.log(btn.parentElement.id);
        btn.parentElement.remove();
        const index = localUsers.findIndex(n => Number(n.id) === Number(btn.parentElement.id));
        if (index !== -1) {
            localUsers.splice(index, 1);
        }
        // console.log(localUsers);
        localStorage.setItem('users', JSON.stringify(localUsers));
        // console.log(JSON.parse(localStorage.getItem('users')));
    })
})

// localUsers.forEach((user) => {
//     getFiniteValue(user);
// });
//
// function getFiniteValue(obj) {
//     let handledFlag = 'temp__isAlreadyHandled__';
//
//     getProp(obj);
//
//     function getProp(o, stack) {
//         var propertyPath;
//
//         for(var prop in o) {
//             if(typeof(o[prop]) === 'object') {
//                 if(!o[prop][handledFlag]) {
//                     Object.defineProperty(o[prop],handledFlag, {
//                         value: true,
//                         writable:false,
//                         configurable: true
//                     });
//
//                     if(!stack)
//                         propertyPath = 'rootObject.' + prop
//                     else
//                         propertyPath = stack + '.' + prop;
//                     getProp(o[prop], propertyPath);
//                 } else {
//                     propertyPath = stack + '.' + prop;
//                     console.error('Циклическая ссылка. Свойство: ' + propertyPath);
//                 }
//                 delete o[prop][handledFlag]
//             } else {
//                 console.log(`${prop}: ${o[prop]}`)
//             }
//         }
//     }
// }