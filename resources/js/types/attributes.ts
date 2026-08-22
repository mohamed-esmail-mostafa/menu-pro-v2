import { Value } from "./value";

export interface Attribute {
    id:number
    name:string;
    slug:string;
    values:Value[]
}