export enum TokenType {
    COMMA,
    DOT,
    PLUS,
    MINUS,
    COLON,
    STAR,
    BANG,
    SEMICOLON,
    SLASH,
    PERCENT,
    DOLLAR,
    POUND,
    LEFT_PAREN,
    RIGHT_PAREN,
    LESS_LESS,
    REG,
    IDENTIFIER,
    STRING,
    NUMBER,
    H0,
    H1,
    H2,
    H3,
    H4,
    H5,
    H6,
    H7,
    H8,
    H9,
    F0,
    F1,
    F2,
    F3,
    F4,
    F5,
    F6,
    F7,
    F8,
    F9,
    B0,
    B1,
    B2,
    B3,
    B4,
    B5,
    B6,
    B7,
    B8,
    B9,
    PREFIX,
    rA,
    rB,
    rC,
    rD,
    rE,
    rF,
    rG,
    rH,
    rI,
    rJ,
    rK,
    rL,
    rM,
    rN,
    rO,
    rP,
    rQ,
    rR,
    rS,
    rT,
    rU,
    rV,
    rW,
    rX,
    rY,
    rZ,
    rBB,
    rTT,
    rWW,
    rXX,
    rYY,
    rZZ,
    IS,
    LOC,
    BYTE,
    WYDE,
    TETRA,
    OCTA,
    GREG,
    LOCAL,
    BSPEC,
    ESPEC,
    ADD,
    SUB,
    MUL,
    DIV,
    ADDU,
    SUBU,
    MULU,
    DIVU,
    NEG,
    NEGU,
    CMP,
    CMPU,
    FLOT,
    FLOTU,
    FIX,
    FIXU,
    FADD,
    FSUB,
    FMUL,
    FDIV,
    FREM,
    FSQRT,
    FINT,
    FCMP,
    FEQL,
    FUN,
    FCMPE,
    FEQLE,
    FUNE,
    SFLOT,
    SFLOTU,
    AND,
    OR,
    XOR,
    ANDN,
    ORN,
    NAND,
    NOR,
    NXOR,
    SL,
    SLU,
    SR,
    SRU,
    MOR,
    MXOR,
    BDIF,
    WDIF,
    TDIF,
    ODIF,
    ORH,
    ORMH,
    ORML,
    ORL,
    ANDNH,
    ANDNMH,
    ANDNML,
    ANDNL,
    SADD,
    MUX,
    LDA,
    GETA,
    ADDU2,
    ADDU4,
    ADDU8,
    ADDU16,
    SET,
    SETH,
    SETMH,
    SETML,
    SETL,
    INCH,
    INCMH,
    INCML,
    INCL,
    LDB,
    LDW,
    LDT,
    LDO,
    STB,
    STW,
    STT,
    STO,
    STCO,
    LDBU,
    LDWU,
    LDTU,
    LDOU,
    STBU,
    STWU,
    STTU,
    STOU,
    LDHT,
    STHT,
    LDSF,
    STSF,
    JMP,
    GO,
    BZ,
    BNZ,
    BN,
    BNN,
    BP,
    BNP,
    BOD,
    BEV,
    CSZ,
    CSNZ,
    CSN,
    CSNN,
    CSP,
    CSNP,
    CSOD,
    CSEV,
    PUSHJ,
    PUSHGO,
    POP,
    SAVE,
    UNSAVE,
    CSWAP,
    PUT,
    GET,
    TRIP,
    TRAP,
    RESUME,
    LDUNC,
    STUNC,
    PRELD,
    PREST,
    PREGO,
    SYNC,
    SYNCID,
    SYNCD,
    LDVTS,
    SWYM,
    EOL,
    EOF
}

export enum ExprType {
    Grouping,
    Unary,
    Factor,
    Term,
    Identifier
}

export enum StmtType {
    Instr,
    PsuedInstr
}

// Come back -- 'literal' needs revision
export type Token = {
    token: TokenType,
    text: string,
    literal: string | number,
    line: number
}

export class Expr {
    constructor(public type : ExprType, public expr : Expr) {
        this.type = type
        this.expr = expr
    }
}

export class ExprTerm extends Expr {
    constructor(public type : ExprType, public expr : Expr, public operator : Token, public right : Expr) {
        super(type, expr)
        this.operator = operator
        this.right = right
    }
}

export class ExprFactor extends Expr {
    constructor(public type : ExprType, public expr : Expr, public operator : Token, public right : Expr) {
        super(type, expr)
        this.operator = operator
        this.right = right
    }
}


export class ExprUnary extends Expr {
    constructor(public type : ExprType, public expr : Expr, public operator : Token) {
        super(type, expr)
        this.operator = operator
    }
}

export type ExprTemp = {
    type: ExprType,
    expr: Expr,
    operator?: Token,
    right?: Expr
}

export type Instr = {
    opcode: Token,
    arguments: [(Expr | Number | Token)?, (Expr | Number | Token)?, (Expr | Number | Token)?];
}

export class Stmt {
    constructor(public type) {
        this.type = type
    }
}

export class InstrStmt extends Stmt {
    constructor(public type : StmtType, public label : Token | null, public instruction : Instr) {
        super(type)
        this.label = label
        this.instruction = instruction
    }
}

export class PseudInstrStmt extends Stmt {
    constructor(public type : StmtType, public name : Token | null, public instrType : TokenType | null, public value : Token | Number) {
        super(type);
    }
}

export class IsStmt extends Stmt {
    constructor(public type : StmtType, public name : Token, public instrType : TokenType, public value : Token | Number) {
        super(type);
        this.name = name;
        this.instrType = instrType;
        this.value = value;
    }
}

export type StmtTemp = {
    type: StmtType,
    label: Token,
    instruction: Instr,
}

export type DeferredStmt = {
    instruction: Stmt,
    location: number
}