import React from 'react';
import { IconComponent } from '../types';

export const SearchIcon: IconComponent = ({ className = 'w-4 h-4 text-gray-500' }) => (
    <svg
        className={className}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
    >
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
    </svg>
);

export const TrashIcon: IconComponent = ({ className = 'size-4' }) => (
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
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
);

export const CrossIcon: IconComponent = ({ className = 'size-4' }) => (
    <svg
        className={className}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.3045 10.8807C10.4636 11.0398 10.7216 11.0398 10.8806 10.8807C11.0398 10.7216 11.0398 10.4636 10.8806 10.3045L8.57614 7.99999L10.8807 5.69546C11.0398 5.53636 11.0398 5.27842 10.8807 5.11932C10.7216 4.96023 10.4636 4.96023 10.3045 5.11932L7.99999 7.42384L5.69545 5.11933C5.53636 4.96023 5.27842 4.96023 5.11932 5.11933C4.96023 5.27842 4.96023 5.53637 5.11932 5.69547L7.42384 7.99999L5.11933 10.3045C4.96023 10.4636 4.96023 10.7215 5.11933 10.8807C5.27842 11.0398 5.53636 11.0398 5.69546 10.8807L7.99999 8.57614L10.3045 10.8807Z"
            fill="#F05C54"
            stroke="#F05C54"
            strokeWidth="0.6"
        />
        <circle cx="8" cy="8" r="7.25" stroke="#F05C54" strokeWidth="1.5" />
    </svg>
);

export const EditIcon: IconComponent = ({ className = 'size-6' }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
    </svg>
);

export const PlusIcon: IconComponent = ({ className = 'size-5' }) => (
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
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

export const DragIcon: IconComponent = ({ className = 'size-4' }) => (
    <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M21 10L3 10M21 14L3 14M12 4L12 10M12 14L12 20M15 18L12 21L9 18M15 6L12 3L9 6"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const OptionsIcon: IconComponent = ({ className = 'size-4' }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="black"
    >
        <circle cx="12" cy="5" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="12" cy="19" r="2" />
    </svg>
);
