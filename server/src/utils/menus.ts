import Menu from '../types/menu';

export function getMainNav(): Menu[] {
    return [
        {
            label: 'PLAY',
            href: '/',
        },
        {
            label: 'ABOUT',
            href: '/about',
        },
        {
            label: 'HIGHSCORES',
            href: '/highscores',
        },
    ];
} 

export function getActiveMenu(items: Menu[], path: string): Menu[] {
    return items.map(item => ({
        active: item.href === path,
        ...item,
    }));
}

export function getDropdownFilter(uniqueLetters: boolean): Menu[] {
    const items: Menu[] = [];
    for (let i = 0; i <= 5; i++) {
        const letters = 5 + i;
        items[i] = {
            label: letters + ' letters',
            href: `/highscores?wordLength=${letters}&uniqueLetters=${uniqueLetters}`
        }
    }

    return items;
}

