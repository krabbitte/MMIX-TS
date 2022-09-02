import {Expr, Token} from "./types";

export function IsToken(obj: any): obj is Token {
    return obj.token != undefined
}

export function IsExpr(obj: any): obj is Expr{
    return obj.expr != undefined
}
