import * as scanner from './scanner';
import * as parser from './parser';
import {Token, StmtType, Stmt} from './types';
import * as environment from './environment';

const source = '// Labels\n' +
    'x   IS    3\n' +
    'y   IS    $1\n' +
    '\n' +
    '/* \n' +
    '    Instructions are assembled and \n' +
    '    stored starting at byte M[64]\n' +
    '*/\n' +
    '\n' +
    'BUFFER BYTE "Hello, World!", 0, "fff"\n' +
    '\n' +
    '\t  LOC\t#64\n' +
    'DO    ADD   y, $1, 3+2*x\n' +
    '\t  SUB   $2,  $1, 1\n' +
    '\t  MUL   $3,  $2, 2\n' +
    '\t  JMP   END\n' +
    '\t  \n' +
    '\t  ADD   $1,  $1, 3+2\n' +
    '\t  ADD   $4,  $1, 2\n' +
    '\n' +
    'START ADD   $4,  $1, 2\n' +
    '\t  JMP   DO\n' +
    '\n' +
    'END\t  TRAP  0, HALT, 0\n' +
    '\n' +
    'MAIN  IS    START\n';

export function Run(source: string) : void {

    const tokens: Token[] = scanner.scanTokens(source);

    for (let i = 0; i < tokens.length; i++)
        console.log(tokens[i])
    console.log("\n")

    const stmts : Stmt[] = parser.parse(tokens);

    for (let i = 0; i < stmts.length; i++)
        console.log(stmts[i])
    console.log("\n")

    environment.initMMIX()

    environment.assembleProgram(stmts)

    environment.execute()
}

Run(source);