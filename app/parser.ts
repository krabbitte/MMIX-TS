import {Expr, ExprType, InstrStmt, PseudInstrStmt, Stmt, StmtType, Token, TokenType} from './types';

const opInfo = [];
{
	opInfo['FCMP'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['FEQL'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['FUN'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['FCMPE'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['FEQLE'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['FUNE'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['SFLOT'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['SFLOTU'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['AND'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['OR'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['XOR'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['ANDN'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['ORN'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['NAND'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['NOR'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['NXOR'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['SL'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['SLU'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['SR'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['SRU'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['MOR'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['MXOR'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['BDIF'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['WDIF'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['TDIF'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['ODIF'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['ORH'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['ORMH'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['ORML'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['ORL'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['ANDNH'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['ANDNMH'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['ANDNML'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['ANDNL'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['SADD'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['MUX'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['LDA'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['GETA'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['ADDU2'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['ADDU4'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['ADDU8'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['ADDU16'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['SET'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['SETH'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['SETMH'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['SETML'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['SETL'] = { args: 3, arithmetic: [ false, false, true ] };
	opInfo['INCH'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['INCMH'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['INCML'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['INCL'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['LDB'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['LDW'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['LDT'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['LDO'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['STB'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['STW'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['STT'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['STO'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['STCO'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['LDBU'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['LDWU'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['LDTU'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['LDOU'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['STBU'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['STWU'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['STTU'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['STOU'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['LDHT'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['STHT'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['LDSF'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['STSF'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['JMP'] = { args: 1, arithmetic: [ false ] };
	opInfo['GO'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['BZ'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['BNZ'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['BN'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['BNN'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['BP'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['BNP'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['BOD'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['BEV'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['CSZ'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['CSNZ'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['CSN'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['CSNN'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['CSP'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['CSNP'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['CSOD'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['CSEV'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['PUSHJ'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['PUSHGO'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['POP'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['SAVE'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['UNSAVE'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['CSWAP'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['PUT'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['GET'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['TRIP'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['TRAP'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['RESUME'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['LDUNC'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['STUNC'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['PRELD'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['PREST'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['PREGO'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['SYNC'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['SYNCID'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['SYNCD'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['LDVTS'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['SWYM'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['ADD'] = { args: 3, arithmetic: [ false, false, true ] };
	opInfo['SUB'] = { args: 3, arithmetic: [ false, false, true ] };
	opInfo['MUL'] = { args: 3, arithmetic: [ false, false, true ] };
	opInfo['DIV'] = { args: 3, arithmetic: [ false, false, true ] };
	opInfo['ADDU'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['SUBU'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['MULU'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['DIVU'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['NEG'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['NEGU'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['CMP'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['CMPU'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['FLOT'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['FLOTU'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['FIX'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['FIXU'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['FADD'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['FSUB'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['FMUL'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['FDIV'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['FREM'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['FSQRT'] = { args: 3, arithmetic: [ false, false, false ] };
	opInfo['FINT'] = { args: 3, arithmetic: [ false, false, false ] };

	opInfo['IS'] = {args: 1, arithmetic: [false, false, false]};
	opInfo['BYTE'] = {args: 3, arithmetic: [false, false, false]};
}

export function parse(tokens) : Stmt[] {

    let statements : Stmt[] = [];
    let current = 0;

    const peek = function() : Token {
        return tokens[current];
    }

    const peekNext = function() : Token {
        return tokens[current + 1];
    }

    const isAtEnd = function() : boolean {
        return peek().token == TokenType.EOF;
    }

    const previous = function() {
        if(current != 0) {
            return tokens[current - 1];
        }
    }

    const advance = function() : Token {
        if(!isAtEnd()) current++;
        return previous();
    }

    const check = function(type: TokenType) : boolean {
        if(isAtEnd()) return false;
        return peek().token === type;
    }

    const consume = function(msg: string, ...tokentypes: TokenType[]) : Token | null {
        for(const type of tokentypes) {
            if(check(type)) return advance();
        }

        //if(msg)
        //   console.log(msg);

        return null;
    }

    const consumeOP = function(msg: string) : Token {
        if(tokens[current].token >= 82 && tokens[current].token <= 225) {
            return advance();
        }

		console.log(tokens[current])

        throw new Error(msg + tokens[current].text);
    }

    const match = function(...tokentypes: TokenType[]) {
        for(const type of tokentypes) {
            if(check(type)) {
                advance();
                return true;
            }
        }

        return false;
    }

    const primary = function() {
        if(match(TokenType.LEFT_PAREN)) {
            let expr: Expr = expression();
            consume("Expect ')' after expression", TokenType.RIGHT_PAREN);
            return {
                type: ExprType.Grouping,
                expr: expr
            }
        }

		if(match(TokenType.NUMBER)) {
			return previous().literal;
		}

		if(match(TokenType.REG) || match(TokenType.IDENTIFIER)) {
			return previous();
		}

		if(match(TokenType.STRING)) {
			return previous()
		}

        throw new Error("expected a number or reg or identifier or string or grouping. got: " + peek());
    }

	const unary = function() {
		if(match(TokenType.BANG, TokenType.MINUS)) {
			let operator = previous();
			let right = unary();

			let expr = {
				type: ExprType.Unary,
				operator: operator,
				right: right
			}

			return expr;
		}

		return primary();
	}

    const factor = () => {
		let expr = unary();
		
		while(match(TokenType.SLASH, TokenType.STAR)) {
			let operator = previous();
			let right = unary();
			expr = {
				type: ExprType.Factor,
				expr: expr,
				operator: operator,
				right: right
			}
		}
        
		return expr;
	}

    const term = () => {
		let expr = factor();

		while(match(TokenType.MINUS, TokenType.PLUS)) {
			let operator = previous();
			let right = factor();
			expr = {
				type: ExprType.Term,
				expr: expr,
				operator: operator,
				right: right
			}
		}
        
		return expr;
	}

    const expression = function() {
        return term();
    }

    const instruction = function() : Stmt {
        let label: Token | null = consume("", TokenType.IDENTIFIER);

        let opcode: Token = consumeOP("Unidentified opcode");
        let args : [(Expr | number)?, (Expr | number)?, (Expr | number)?] = [];
        let numArgs = opInfo[opcode.text].args;

		for(let i = 0; i < numArgs; i++) {

			// Handle the separation between arithmetic allowing instructions better
			if(opInfo[opcode.text].arithmetic[i] == true){
				args.push(expression());
			} else {
				args.push(primary());
			}

			if(i != numArgs - 1) {
				consume("Where's the comma?", TokenType.COMMA);
			}
		}
        
        for(let i = 0; i < 3-numArgs; i++) {
			args.push(0);
		}

		return new InstrStmt(StmtType.Instr, label, {opcode: opcode, arguments: args})
    }

    const pseudoInstr = function(tokentype: TokenType) : PseudInstrStmt {
        let label : Token | null = consume("", TokenType.IDENTIFIER);
        let instrType = consumeOP("Expected pseudo instruction ");
		let value : Token | Number

		console.log(instrType)

		if(tokentype == TokenType.IS) {
			value = expression();
		} else if(tokentype >= 84 && tokentype <= 88) {
			console.log("entering")
			for (let i = 0; i < 3; i++) {
				let arg1 = expression()
				consume("expected comma", TokenType.COMMA)
				let arg2 = expression()
				consume("expected comma", TokenType.COMMA)
				let arg3 = expression()


			}
		}

		// Needs to be revised
		// @ts-ignore
		return new PseudInstrStmt(StmtType.PsuedInstr, label, instrType.token, value)
    }

    const statement = () => {
		let stmt;
        if(peekNext().token === TokenType.IS) {
            stmt = pseudoInstr(TokenType.IS);
        } else if(peek().token >= 83 && peek().token <= 91) {
            stmt = pseudoInstr(peek().token)
        } else if (peekNext().token >= 83 && peekNext().token <= 91) {
            stmt = pseudoInstr(peekNext().token)
        } else {
			console.log(peekNext())
			stmt = instruction();
		}

		return stmt;
	}

    while(!isAtEnd()) {
        while(peek().token === TokenType.EOL) {
            advance();
        }

        let temp : Stmt = statement();

        if(!isAtEnd()) {
            consume("Expected newline", TokenType.EOL);
        }

        if(temp)
            statements.push(temp);
    }

    return statements;
}