import { IconComponent } from './types';
import {
    SortIcon,
    SortAscIcon,
    SortDescIcon,
    ChevronsDownIcon,
    ChevronsUpIcon,
    ChevronsLeftIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsRightIcon,
} from './definitions/navigationIcons';
import {
    SearchIcon,
    TrashIcon,
    CrossIcon,
    EditIcon,
    PlusIcon,
    DragIcon,
    OptionsIcon,
    PensilIcon,
} from './definitions/actionIcons';

const ICON_REGISTRY = {
    'sort': SortIcon,
    'sort_asc': SortAscIcon,
    'sort_desc': SortDescIcon,
    'chevrons-down': ChevronsDownIcon,
    'chevrons-up': ChevronsUpIcon,
    'chevrons-left': ChevronsLeftIcon,
    'chevron-left': ChevronLeftIcon,
    'chevron-right': ChevronRightIcon,
    'chevrons-right': ChevronsRightIcon,
    'search': SearchIcon,
    'trash': TrashIcon,
    'cross': CrossIcon,
    'edit': EditIcon,
    'plus': PlusIcon,
    'drag': DragIcon,
    'options': OptionsIcon,
    'pensil': PensilIcon,
} as const satisfies Record<string, IconComponent>;

export type IconName = keyof typeof ICON_REGISTRY;

export function getIconComponent(name: string): IconComponent | undefined {
    return (ICON_REGISTRY as Record<string, IconComponent>)[name];
}

export function isValidIconName(name: string): name is IconName {
    return name in ICON_REGISTRY;
}
