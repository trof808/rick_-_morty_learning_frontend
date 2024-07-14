async function getHeroes(page = 1, name = '', status = null) {
    let url = `https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`
    if (status) {
        url += `status=${status}`
    }
    return fetch(url).then(res => res.json());
}

const heroesListElement = document.querySelector('.heroes-list');

let isAllRendered = false;

function createHeroInfo({ name, status, origin }) {
    const heroInfo = document.createElement('div');
    heroInfo.classList.add('hidden', 'item-info');
    const heroName = document.createElement('h1');
    const heroStatus = document.createElement('div');
    heroStatus.classList.add('status');
    const heroPlanet = document.createElement('div');

    heroName.textContent = name;
    heroStatus.textContent = status;
    heroPlanet.textContent = `Planet: ${origin?.name}`;

    if (status === 'Alive') {
        heroStatus.classList.add('alive');
    }
    if (status === 'Dead') {
        heroStatus.classList.add('dead');
    }
    if (status === 'unknown') {
        heroStatus.classList.add('unknown');
    }

    heroInfo.appendChild(heroName);
    heroInfo.appendChild(heroStatus);
    heroInfo.appendChild(heroPlanet);

    return heroInfo;
}

function createHeroeElement({ name, status, image, origin }, isLast) {
    const heroeElement = document.createElement('div');
    const heroeImg = document.createElement('img');
    const nextButton = document.createElement('button');
    const heroInfo = createHeroInfo({ name, status, origin })
    heroeImg.src = image;
    heroeImg.width = 200;
    heroeImg.height = 200;
    heroeElement.appendChild(heroeImg);
    heroeElement.appendChild(heroInfo);
    heroeElement.classList.add('item');
    if (status === 'Alive') {
        heroeElement.classList.add('alive');
    }
    if (status === 'Dead') {
        heroeElement.classList.add('dead');
    }
    if (status === 'unknown') {
        heroeElement.classList.add('unknown');
    }
    heroeElement.addEventListener('click', (e) => {
        const img = heroeElement.querySelector('img');
        if (img.classList.contains('hidden')) {
            img.classList.remove('hidden');
            heroInfo.classList.add('hidden');
        } else {
            img.classList.add('hidden');
            heroInfo.classList.remove('hidden');
        }
        console.log(e.currentTarget);
    });
    return heroeElement;
}

function renderAllHeroes(name = '') {
    heroesListElement.innerHTML = '';
    getHeroes(1, name).then(data => {
        console.log(data);
        const isLast = data.info.next;
        const heroes = data.results;
        heroes.forEach(heroeParameters => {
            heroesListElement.appendChild(createHeroeElement(heroeParameters, isLast));
        });
    });
}

function searchHeroes() {
    const searchElement = document.querySelector('.heroes-search');
    console.log(searchElement);
    searchElement.addEventListener('keyup', (e) => {
        console.log(e);
        const value = e.target.value;
        renderAllHeroes(value);
    })
}

renderAllHeroes();
searchHeroes();