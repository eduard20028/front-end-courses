const books = [
    {
        id: '1',
        author: 'Author1',
        title: 'Title1',
        img: 'https://storage.yvision.kz/images/user/creepy_neko/CD4yikgU28fdEV23uSg7KFcEKWOn2H.jpg',
        plot: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
Quibusdam voluptatibus reiciendis nulla sit, non laborum corrupti commodi molestias.`
    },
    {
        id: '2',
        author: 'Author2',
        title: 'Title2',
        img: 'https://i.pinimg.com/564x/86/b7/2a/86b72a0b8fa545c4c1ecc2bf78d4960c.jpg',
        plot: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
Quibusdam voluptatibus reiciendis nulla sit, non laborum corrupti commodi molestias.`
    },
    {
        id: '3',
        author: 'Author3',
        title: 'Title3',
        img: 'https://images-na.ssl-images-amazon.com/images/I/51FiPTWjtPL.jpg',
        plot: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
Quibusdam voluptatibus reiciendis nulla sit, non laborum corrupti commodi molestias.`
    }
]

if(!localStorage.getItem('bookList')){
    localStorage.setItem('bookList', JSON.stringify(books));
}