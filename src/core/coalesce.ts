import { Nullable, isNull } from '../components/IBaseProps';


export function coalesce<T>(defValue: T) {
    return function (operand: Nullable<T>) {
        return isNull(operand) ? defValue : operand;
    };
}
