import {Expr, ExprFactor, ExprTerm, ExprType, ExprUnary, Token, TokenType} from "./types";
import * as environment from './environment'
import {IsToken, IsExpr} from './utilities'

export function evaluate(arg : Expr | Token | Number) {
	if (typeof arg == "number") {
		return arg
	} else if(IsExpr(arg)) {
		if (arg.type == ExprType.Grouping) {
			return evalGrouping(arg);
		} else if (arg.type == ExprType.Term) {
			return evalTerm(<ExprTerm>arg);
		} else if (arg.type == ExprType.Factor) {
			return evalFactor(<ExprFactor>arg);
		} else if (arg.type == ExprType.Unary) {
			return evalUnary(<ExprUnary>arg);
		}
	} else if(IsToken(arg)) {
		if(arg.token == TokenType.IDENTIFIER) {
			return environment.Constants[arg.text];
		} else if (arg.token == TokenType.REG) {
			return arg.literal;
		} else if (arg.token == undefined) {
			return arg;
		}
	}

	throw new Error("wtf: " + arg);
}

function evalGrouping(arg) {
	return evaluate(arg.expr);
}

function evalTerm(arg : ExprTerm) {
	if(arg.type == ExprType.Term) {
		if(arg.operator.text == '+') {
			return evaluate(arg.expr) + evaluate(arg.right);
		} else if(arg.operator.text == '-') {
			return evaluate(arg.expr) - evaluate(arg.right);
		} else {
			throw new Error("not a term or something??");
		}
	}
}

function evalFactor(arg : ExprFactor) {
	if(arg.type == ExprType.Factor) {
		if(arg.operator.text == '*') {
			return evaluate(arg.expr) * evaluate(arg.right);
		} else {
			return evaluate(arg.expr) / evaluate(arg.right);
		}
	}
}

function evalUnary(arg : ExprUnary) {
	if(arg.type == ExprType.Unary) {
		if(arg.operator.text == '-') {
			return - evaluate(arg.expr);
		} else if(arg.operator.text == '!') {
			return !evaluate(arg.expr);
		}
	}
}
