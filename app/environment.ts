import {DeferredStmt, InstrStmt, IsStmt, PseudInstrStmt, Stmt, StmtType, Token, TokenType} from "./types";
import * as evalExpr from './evalExpr'
import {opFuncs as ops} from './ops'
import {IsExpr, IsToken} from './utilities'

const opMap : Record<string, number> = {
    'TRAP': 0x00,
    'FCMP': 0x01,
    'FUN' : 0x02,
    'FADD': 0x04,
    'FIX' : 0x05,
    'FSUB': 0x06,
    'FIXU': 0x07,
    'FLOT': 0x08,
    'FLOTI': 0x09,
    'FLOTU': 0x0A,
    'FLOTUI': 0x0B,
    'SFLOT': 0x0C,
    'SFLOTI': 0x0D,
    'SFLOTU': 0x0E,
    'SFLOTUI': 0x0F,
    'FMUL': 0x10,
    'FCMPE': 0x11,
    'FUNE': 0x12,
    'FEQLE': 0x13,
    'FDIV': 0x14,
    'FSQRT': 0x15,
    'FREM': 0x16,
    'FINT': 0x17,
    'MUL': 0x18,
    'MULI': 0x19,
    'MULU': 0x1A,
    'MULUI': 0x1B,
    'DIV': 0x1C,
    'DIVI': 0x1D,
    'DIVU': 0x1E,
    'DIVUI': 0x1F,
    'ADD': 0x20,
    'ADDI': 0x21,
    'ADDU': 0x22,
    'ADDUI': 0x23,
    'SUB': 0x24,
    'SUBI': 0x25,
    'SUBU': 0x26,
    'SUBUI': 0x27,
    '2ADDU': 0x28,
    '2ADDUI': 0x29,
    '4ADDU': 0x2A,
    '4ADDUI': 0x2B,
    '8ADDU': 0x2C,
    '8ADDUI': 0x2D,
    '16ADDU': 0x2E,
    '16ADDUI': 0x2F,
    'CMP': 0x30,
    'CMPI': 0x31,
    'CMPU': 0x32,
    'CMPUI': 0x33,
    'NEG': 0x34,
    'NEGI': 0x35,
    'NEGU': 0x36,
    'NEGUI': 0x37,
    'SL': 0x38,
    'SLI': 0x39,
    'SLU': 0x3A,
    'SLUI': 0x3B,
    'SR': 0x3C,
    'SRI': 0x3D,
    'SRU': 0x3E,
    'SRUI': 0x3F,
    'BN': 0x40,
    'BNB': 0x41,
    'BZ': 0x42,
    'BZB': 0x43,
    'BP': 0x44,
    'BPB': 0x45,
    'BOD': 0x46,
    'BODB': 0x47,
    'BNN': 0x48,
    'BNNB': 0x49,
    'BNZ': 0x4A,
    'BNZB': 0x4B,
    'BNP': 0x4C,
    'BNPB': 0x4D,
    'BEV': 0x4E,
    'BEVB': 0x4F,
    'PBN': 0x50,
    'PBNB': 0x51,
    'PBZ': 0x52,
    'PBZB': 0x53,
    'PBP': 0x54,
    'PBPB': 0x55,
    'PBOD': 0x56,
    'PBODB': 0x57,
    'PBNN': 0x58,
    'PBNNB': 0x59,
    'PBNZ': 0x5A,
    'PBNZB': 0x5B,
    'PBNP': 0x5C,
    'PBNPB': 0x5D,
    'PBEV': 0x5E,
    'PBEVB': 0x5F,
    'CSN': 0x60,
    'CSNI': 0x61,
    'CSZ': 0x62,
    'CSZI': 0x63,
    'CSP': 0x64,
    'CSPI': 0x65,
    'CSOD': 0x66,
    'CSODI': 0x67,
    'CSNN': 0x68,
    'CSNNI': 0x69,
    'CSNZ': 0x6A,
    'CSNZI': 0x6B,
    'CSNP': 0x6C,
    'CSNPI': 0x6D,
    'CSEV': 0x6E,
    'CSEVI': 0x6F,
    'ZSN': 0x70,
    'ZSNI': 0x71,
    'ZSZ': 0x72,
    'ZSZI': 0x73,
    'ZSP': 0x74,
    'ZSPI': 0x75,
    'ZSOD': 0x76,
    'ZSODI': 0x77,
    'ZSNN': 0x78,
    'ZSNNI': 0x79,
    'ZSNZ': 0x7A,
    'ZSNZI': 0x7B,
    'ZSNP': 0x7C,
    'ZSNPI': 0x7D,
    'ZSEV': 0x7E,
    'ZSEVI': 0x7F,
    'LDB': 0x80,
    'LDBI': 0x81,
    'LDBU': 0x82,
    'LDBUI': 0x83,
    'LDW': 0x84,
    'LDWI': 0x85,
    'LDWU': 0x86,
    'LDWUI': 0x87,
    'LDT': 0x88,
    'LDTI': 0x89,
    'LDTU': 0x8A,
    'LDTUI': 0x8B,
    'LDO': 0x8C,
    'LDOI': 0x8D,
    'LDOU': 0x8E,
    'LDOUI': 0x8F,
    'LDSF': 0x90,
    'LDSFI': 0x91,
    'LDHT': 0x92,
    'LDHTI': 0x93,
    'CSWAP': 0x94,
    'CSWAPI': 0x95,
    'LDUNC': 0x96,
    'LDUNCI': 0x97,
    'LDVTS': 0x98,
    'LDVTSI': 0x99,
    'PRELD': 0x9A,
    'PRELDI': 0x9B,
    'PREGO': 0x9C,
    'PREGOI': 0x9D,
    'GO': 0x9E,
    'GOI': 0x9F,
    'STB': 0xA0,
    'STBI': 0xA1,
    'STBU': 0xA2,
    'STBUI': 0xA3,
    'STW': 0xA4,
    'STWI': 0xA5,
    'STWU': 0xA6,
    'STWUI': 0xA7,
    'STT': 0xA8,
    'STTI': 0xA9,
    'STTU': 0xAA,
    'STTUI': 0xAB,
    'STO': 0xAC,
    'STOI': 0xAD,
    'STOU': 0xAE,
    'STOUI': 0xAF,
    'STSF': 0xB0,
    'STSFI': 0xB1,
    'STHT': 0xB2,
    'STHTI': 0xB3,
    'STCO': 0xB4,
    'STCOI': 0xB5,
    'STUNC': 0xB6,
    'STUNCI': 0xB7,
    'SYNCD': 0xB8,
    'SYNCDI': 0xB9,
    'PREST': 0xBA,
    'PRESTI': 0xBB,
    'SYNCID': 0xBC,
    'SYNCIDI': 0xBD,
    'PUSHGO': 0xBE,
    'PUSHGOI': 0xBF,
    'OR': 0xC0,
    'ORI': 0xC1,
    'ORN': 0xC2,
    'ORNI': 0xC3,
    'NOR': 0xC4,
    'NORI': 0xC5,
    'XOR': 0xC6,
    'XORI': 0xC7,
    'AND': 0xC8,
    'ANDI': 0xC9,
    'ANDN': 0xCA,
    'ANDNI': 0xCB,
    'NAND': 0xCC,
    'NANDI': 0xCD,
    'NXOR': 0xCE,
    'NXORI': 0xCF,
    'BDIF': 0xD0,
    'BDIFI': 0xD1,
    'WDIF': 0xD2,
    'WDIFI': 0xD3,
    'TDIF': 0xD4,
    'TDIFI': 0xD5,
    'ODIF': 0xD6,
    'ODIFI': 0xD7,
    'MUX': 0xD8,
    'MUXI': 0xD9,
    'SADD': 0xDA,
    'SADDI': 0xDB,
    'MOR': 0xDC,
    'MORI': 0xDD,
    'MXOR': 0xDE,
    'MXORI': 0xDF,
    'SETH': 0xE0,
    'SETMH': 0xE1,
    'SETML': 0xE2,
    'SETL': 0xE3,
    'INCH': 0xE4,
    'INCMH': 0xE5,
    'INCML': 0xE6,
    'INCL': 0xE7,
    'ORH': 0xE8,
    'ORMH': 0xE9,
    'ORML': 0xEA,
    'ORL': 0xEB,
    'ANDNH': 0xEC,
    'ANDNMH': 0xED,
    'ANDNML': 0xEE,
    'ANDNL': 0xEF,
    'JMP': 0xF0,
    'JMPB': 0xF1,
    'PUSHJ': 0xF2,
    'PUSHJB': 0xF3,
    'GETA': 0xF4,
    'GETAB': 0xF5,
    'PUT': 0xF6,
    'PUTI': 0xF7,
    'POP': 0xF8,
    'RESUME': 0xF9,
    'SAVE': 0xFA,
    'UNSAVE': 0xFB,
    'SYNC': 0xFC,
    'SWYM': 0xFD,
    'GET': 0xFE,
    'TRIP': 0xFF,
}

// @ts-ignore
export let Registers : BigUint64Array = new BigUint64Array(256);
export let SpecialRegisters = {};
export let RegisterLabels = {};
export let Labels = {};
export let LabelLabels = {};
export let Constants : Record<string, number>;
// @ts-ignore
export let Code : BigUint64Array = new BigUint64Array(512);
export let Memory : Uint8Array = new Uint8Array(1024);

export let Out : string[] = []

export let iptr = 0;
export let gregptr = 255;
let running : boolean = false

if(Object.seal){
    // @ts-ignore
    Registers.fill(0n);
    Object.seal(Registers);
    Memory.fill(0);
    Object.seal(Memory);
    // @ts-ignore
    Code.fill(0n);
    Object.seal(Code);
}

export function initMMIX() {
    iptr = 0;
    gregptr = 255;

    // @ts-ignore
    Registers = new BigUint64Array(256);
    SpecialRegisters = {};
    RegisterLabels = {};
    Labels = {};
    Constants = {};
    // @ts-ignore
    Code = new BigUint64Array(512);
    Memory = new Uint8Array(1024);

    Constants['@'] = 0;
    Constants['HALT'] = 1;
    Constants['Fputs'] = 2;
    Constants['StdOut'] = 3;

    if(Object.seal){
        // @ts-ignore
        Registers.fill(0n);
        Object.seal(Registers);
        Memory.fill(0);
        Object.seal(Memory);
        // @ts-ignore
        Code.fill(0n);
        Object.seal(Code);
    }
}

function toBytes(int, size) {
    let bytes = new Uint8Array(size);

    bytes.fill(0);

    for(let i = 0; i < size; i++) {
        // @ts-ignore
        bytes[i] = Number((BigInt(int) >> BigInt((size * 8) - ((i+1) * 8))) & 0x00000000000000ffn);
    }

    return bytes;
}

export function assembleProgram(statements) {
    // Separate IS pseudo-instruction for early execution
    let isInstr : IsStmt[] = []
    let instructions : Stmt[] = []

    for (let i = 0; i < statements.length; i++) {
        if(statements[i].type === StmtType.PsuedInstr && (statements[i] as PseudInstrStmt).instrType === TokenType.IS) {
            isInstr.push(statements[i])
        } else {
            instructions.push(statements[i])
        }
    }

    // Store control-flow instructions whose label arguments have not yet been defined
    let forLater : DeferredStmt[] = [];

    // Pointer to the current position we are assembling instructions/data into
    let memptr = 0;

    // Handle non-IS pseudo-instructions directly
    const execPseudoInstr = (stmt: Stmt) => {
        if ((stmt as PseudInstrStmt).instrType === TokenType.LOC) {
            // Come back
            //Labels[(stmt as PseudInstrStmt).name.text] = (stmt as PseudInstrStmt).value;

            memptr = evalExpr.evaluate((stmt as PseudInstrStmt).value)
        } else if((stmt as PseudInstrStmt).instrType === TokenType.BYTE) {

        }
    }

    // Assembles an individual instruction into an unsigned BigInt
    const assembleInstr = (stmt : InstrStmt) => {
        // @ts-ignore
        let instr = 0n;

        // @ts-ignore
        let op = BigInt(opMap[stmt.instruction.opcode.text]);
        // @ts-ignore
        instr |= (op << 24n);

        let evalArgs = [];

        // @ts-ignore
        for(let i = 0n; i < stmt.instruction.arguments.length; i++) {
            // @ts-ignore
            let arg = stmt.instruction.arguments[i];

            if(arg === undefined) {
                continue
            }

            let newArg;
            if (typeof arg === "number") {
                newArg = arg;
            } else if (IsToken(arg)) {
                if (arg.token === TokenType.REG) {
                    newArg = arg.literal;
                } else if (arg.token === TokenType.IDENTIFIER) {
                    if(stmt.instruction.opcode.text === 'JMP'){
                        newArg = Labels[arg.literal];
                    } else if (stmt.instruction.opcode.text == 'TRAP') {
                        newArg = Constants[arg.literal];
                    } else {
                        newArg = RegisterLabels[arg.literal];
                    }
                }
            } else if (IsExpr(arg)) {
                newArg = evalExpr.evaluate(arg);
            }


            // @ts-ignore
            instr |= (BigInt(newArg) << ((2n-i)*8n));
        }

        return instr;
    }

    // Execute all IS instructions, creating labels for later use
    for(let i = 0; i < isInstr.length; i++) {
        if(typeof isInstr[i].value == "number") {
            Constants[(isInstr[i].name?.text as string)] = isInstr[i].value as unknown as number;
        } else if((isInstr[i].value as Token).token === TokenType.REG) {
            RegisterLabels[isInstr[i].name.text] = (isInstr[i].value as Token).literal;
        } else if((isInstr[i].value as Token).token === TokenType.IDENTIFIER) {
            LabelLabels[(isInstr[i].value as Token).text] = isInstr[i].name.literal;
        }
    }

    // Assemble instructions whose arguments have defined labels
    for(let i = 0; i < instructions.length; i++) {
        if(instructions[i].type === StmtType.Instr) {

            // Create labels
            if((instructions[i] as InstrStmt).label !== null) {
                // LabelLabels allows for other labels to be used as the MAIN label
                if(LabelLabels[((instructions[i] as InstrStmt).label as Token).text] !== undefined) {
                    Labels[LabelLabels[((instructions[i] as InstrStmt).label as Token).text]] = memptr;
                } else {
                    Labels[((instructions[i] as InstrStmt).label as Token).text] = memptr;
                }
            }

            // Skip instruction if label is not yet defined
            if((instructions[i] as InstrStmt).instruction.opcode.token === TokenType.JMP && Labels[((instructions[i] as InstrStmt).instruction.arguments[0] as number)] === undefined) {
                forLater.push({
                    instruction: instructions[i],
                    location: memptr
                });
                memptr += 4;
                continue;
            }

            //console.log("Assembling " + (instructions[i] as InstrStmt).instruction.opcode.text + " at M[" + memptr + "]")

            let num = assembleInstr((instructions[i] as InstrStmt));

            // Break BigInt into bytes and copy to Memory
            let bytes = toBytes(num, 4);
            for(let j = 0; j < 4; j++) {
                Memory[memptr + j] = bytes[j];
            }

            memptr += 4;
        } else {
            execPseudoInstr(instructions[i]);
        }
    }

    // Assemble remaining control-flow instructions
    for(let i = 0; i < forLater.length; i++) {
        let num = assembleInstr((forLater[i].instruction as InstrStmt));

        //console.log("Assembling " + (forLater[i].instruction as InstrStmt).instruction.opcode.text + " at M[" + forLater[i].location + "]")

        let bytes = toBytes(num, 4);

        for(let j = 0; j < 4; j++) {
            Memory[forLater[i].location + j] = bytes[j];
        }
    }


    // Set the instruction pointer to the 'MAIN' label
    setIptr(Labels['MAIN']);
}

export function execute() {
    running = true;
    while(running){
        executeNext()
    }
}

export function executeNext() {
    let op = Memory[iptr];
    let args = [Memory[iptr + 1], Memory[iptr + 2], Memory[iptr + 3]];

    let instr = {
        op: op,
        args: args
    }

    executeInstr(instr);
}

export function executeInstr(instr) {
    // Get and call the appropriate method for a given instruction from the ops module
    let opMethod = ops[instr.op];
    opMethod(instr.args);
    iptr += 4;
}


export const setIptr = (i) => {
    iptr = i;
}

export const halt = () => {
    running = false;
}