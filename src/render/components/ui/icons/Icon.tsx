import React from 'react';
import { getIconComponent, IconName } from './iconRegistry';

export interface IconProps {
    name: IconName;
    className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className }) => {
    const IconComp = getIconComponent(name);

    if (!IconComp) {
        return null;
    }

    return <IconComp className={className} />;
};
