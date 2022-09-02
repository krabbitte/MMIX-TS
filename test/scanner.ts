import { TokenType, Token } from './types';

export function scanTokens(source: string) : Token[] {
    let start = 0, current = 0, line = 1;
    let tokens: Token[] = [];

    const addToken = function(type: TokenType, literal: number | string = "") {
        tokens.push({
            token: type,
            text: source.substring(start, current),
            literal: literal,
            line: line
        });
    }

    const isAtEnd = function() : boolean {
        return current >= source.length;
    }

    const peek = function() : string {
        return isAtEnd() ? '\0' : source[current];
    }

    const peekNext = function() : string {
        return (current + 1 >= source.length) ? '\0' : source[current + 1];
    }

    const advance = function() : string { 
        return source[current++] 
    };

    const isDigit = function(c: string) : boolean {
        return c >= '0' && c <= '9';
    }

    const register = function() : void {
        while(isDigit(peek())) advance();
        addToken(TokenType.REG, parseInt(source.substring(start + 1, current)));
    }

    const isAlpha = function(c: string) : boolean {
        return (c >= 'a' && c <= 'z') ||
        (c >= 'A' && c <= 'Z') ||
         c == '_' || c == '@';
    }

    const isAlphaNumeric = function(c: string) : boolean {
        return isAlpha(c) || isDigit(c);
    }

    const number = function() : void {
        while(isDigit(peek())) advance();
        addToken(TokenType.NUMBER, parseInt(source.substring(start, current)));
    }

    const identifier = function() : void {
        while(isAlphaNumeric(peek())) advance();    
        
        let text: string = source.substring(start, current);
        let token: TokenType = TokenType[text];
        
        if(TokenType[text]) {
            addToken(token, text);
        } else {
            addToken(TokenType.IDENTIFIER, text);
        }
    }

    const match = function(expected: string) : boolean {
        if(isAtEnd() || source[current] != expected) return false;
        current++;
        return true;
    }

    const string = function() : void {
        while(peek() != "\"") advance();
        advance()
        let text: string = source.substring(start, current);
        console.log(text)

        addToken(TokenType.STRING, text)
    }

	const scanToken = () => {
		let c = advance();

		switch(c) {
			case ',': addToken(TokenType.COMMA); break;
			case '.':  addToken(TokenType.DOT); break;
			case '+': addToken(TokenType.PLUS); break;
			case '-': addToken(TokenType.MINUS); break;
			case '*': addToken(TokenType.STAR); break;
            case ':': addToken(TokenType.COLON); break;
            case '(': addToken(TokenType.LEFT_PAREN); break;
            case ')': addToken(TokenType.RIGHT_PAREN); break;

            // Detect register tokens
            case '$':
            	if(isDigit(peek())) {
            		register();
            	} else {
            		console.log("oh no");
            	}
            	break;

            case '<':
                if(match('<')) {
                    addToken(TokenType.LESS_LESS);
                } else {
            		console.log("oh no");
                }
                break;

            case ';':

            // Handle comments in the form '% comment'
            case '%':
                while(peek() != '\n' && !isAtEnd()) advance();
                while(peek() == '\n') advance();
                break;

            // Handle the multiple cases arising from '/'
            case '/':
            	// Beginning of a comment in the form '//comment' and '/* comment */'
                if(match('/')) {
                    while(peek() != '\n' && !isAtEnd()) advance();
                    while(peek() == '\n') advance();
                } else if(match('*')) {
                	while(peek() != '*' && peekNext() != '/' && !isAtEnd()) advance();
                	advance();
                	advance();
                    while(peek() == '\n') advance();
                } else {
                	// the '/' of division
                    addToken(TokenType.SLASH);
                }
                break;

            // Handle whitespace
            case ' ':
            case '\r':
            case '\t':
                break;

            // ignore the pound symbol
            case '#':
            	break;	

            // Line breaks have syntactical signifigance right now, placing one EOL token for an arbitrary
            // number of '\n's
            case '\n':
                addToken(TokenType.EOL);
                line++;
                while(peek() == '\n' || peek() == '\t' || peek() == ' ') advance();
                break;

            case '"': string(); break;

            default:
            if(isDigit(c)) {
            	number();
            } else if (isAlpha(c)) {
            	identifier();
            } else {
            	// Unknown character
            	console.log("error oh no " + c);
            }
            break;
		}
	}

    while(!isAtEnd()) {
        start = current;
        scanToken();
    }

    addToken(TokenType.EOF);

    return tokens;
}