import { IconComponent } from '../types';

export const SortIcon: IconComponent = ({ className = 'size-4' }) => (
    <svg
        className={className}
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M7.45434 10.6528C7.75792 10.9824 8.24189 10.9824 8.54547 10.6528L11.3621 7.5951C11.8645 7.04969 11.518 6.10002 10.8165 6.10002H5.18327C4.48184 6.10002 4.1353 7.04969 4.6377 7.5951L7.45434 10.6528Z"
            fill="#8A9099"
        />
    </svg>
);

export const SortAscIcon: IconComponent = ({ className = 'size-4' }) => (
    <svg
        className={className}
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M7.45434 10.6528C7.75792 10.9824 8.24189 10.9824 8.54547 10.6528L11.3621 7.5951C11.8645 7.04969 11.518 6.10002 10.8165 6.10002H5.18327C4.48184 6.10002 4.1353 7.04969 4.6377 7.5951L7.45434 10.6528Z"
            fill="#8A9099"
        />
    </svg>
);

export const SortDescIcon: IconComponent = ({ className = 'size-4' }) => (
    <svg
        className={className}
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M7.45434 10.6528C7.75792 10.9824 8.24189 10.9824 8.54547 10.6528L11.3621 7.5951C11.8645 7.04969 11.518 6.10002 10.8165 6.10002H5.18327C4.48184 6.10002 4.1353 7.04969 4.6377 7.5951L7.45434 10.6528Z"
            fill="#8A9099"
            transform="rotate(180 8 8.5)"
        />
    </svg>
);

export const ChevronsDownIcon: IconComponent = ({ className = 'size-4' }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="7 13 12 18 17 13" />
        <polyline points="7 6 12 11 17 6" />
    </svg>
);

export const ChevronsUpIcon: IconComponent = ({ className = 'size-4' }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="17 11 12 6 7 11" />
        <polyline points="17 18 12 13 7 18" />
    </svg>
);

export const ChevronsLeftIcon: IconComponent = ({ className = 'w-4 h-4' }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
        />
    </svg>
);

export const ChevronLeftIcon: IconComponent = ({ className = 'w-4 h-4' }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
        />
    </svg>
);

export const ChevronRightIcon: IconComponent = ({ className = 'w-4 h-4' }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
        />
    </svg>
);

export const ChevronsRightIcon: IconComponent = ({ className = 'w-4 h-4' }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
        />
    </svg>
);
