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
            href: '/highscores/5/hasRepeats',
        },
    ];
} 

export function getActiveMenu(items: Menu[], path: string): Menu[] {
    return items.map(item => ({
        active: item.href === path,
        ...item,
    }));
}

