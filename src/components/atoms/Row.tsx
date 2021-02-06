import React from 'react';
import { put } from '../../core/tc/writer';
import { isNotEmptyOrNull } from '../../core/text';
import { Nullable } from '../IBaseProps';
import { MinimalProps } from '../MinimalProps';
import { distinct } from './Container';

export function foldClasses(...cs: Nullable<string>[]): string {
    return distinct([...cs]).filter(isNotEmptyOrNull).join(' ');
}
export function Row(props: MinimalProps): JSX.Element {
    const [{ children, className, ...spread }, classes] = put<MinimalProps>('row')(props);
    const cn = foldClasses(className, ...classes, ].filter(isNotEmptyOrNull)).join(' ');
    return <div className={cn} {...spread}>{children}</div>
};