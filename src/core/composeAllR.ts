import { composeR } from './composeR';
import { AnyFunction, LengthMin1 } from '../components/IBaseProps';


export function composeAllR<T extends AnyFunction[], U>(
    ...funcs: T
): (...arg: Parameters<T[0]>) => ReturnType<T[LengthMin1<T>]> {
    return funcs.reduce(composeR);
}
