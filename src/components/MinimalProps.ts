import { Children } from './Children';

export interface MinimalProps {
    id?: string;
    classList?: string[];
    children: Children;
    className?: string;
}

export type PropsWriter<T> = [props: T, cl: string[]];