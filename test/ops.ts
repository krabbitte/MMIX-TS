import * as environment from './environment';

const ADD : Function = (args) => {
    console.log("Executing ADD $" + args[0] + ", $" + args[1] + ", " + args[2]);
    // @ts-ignore
    environment.Registers[args[0]] = environment.Registers[args[1]] + BigInt(args[2]);
    //console.log("Output in Reg[" + args[0] + "]: " + environment.Registers[args[0]]);
}

const SUB : Function = (args) => {
    console.log("Executing SUB $" + args[0] + ", $" + args[1] + ", " + args[2]);
    // @ts-ignore
    environment.Registers[args[0]] = environment.Registers[args[1]] - BigInt(args[2]);
    //console.log("Output in Reg[" + args[0] + "]: " + environment.Registers[args[0]]);
}

const MUL : Function = (args) => {
    console.log("Executing MUL $" + args[0] + ", $" + args[1] + ", " + args[2]);
    // @ts-ignore
    environment.Registers[args[0]] = environment.Registers[args[1]] * BigInt(args[2]);
    //console.log("Output in Reg[" + args[0] + "]: " + environment.Registers[args[0]]);
}

const DIV : Function = (args) => {
    console.log("Executing DIV $" + args[0] + ", $" + args[1] + ", " + args[2]);
    // @ts-ignore
    environment.Registers[args[0]] = environment.Registers[args[1]] / BigInt(args[2]);
    //console.log("Output in Reg[" + args[0] + "]: " + environment.Registers[args[0]]);
}

const SETL : Function = (args) => {
    console.log("Executing SETL $" + args[0] + ", $" + args[1] + ", " + args[2]);
    //console.log("Output in Reg[" + args[0] + "]: " + environment.Registers[args[0]]);
}

const TRAP : Function = (args) => {
    if (args[1] == environment.Constants["HALT"]) {
        environment.halt();
    } else if (args[1] == environment.Constants["Fputs"]) {
        let output = ""
        for (let i = 0; i < 10; i++) {
            output += String.fromCharCode(environment.Memory[args[2] + i])
        }
        environment.halt()
    }
}

const JMP : Function = (args) => {
    console.log("Executing JMP " + (args[0]));
    environment.setIptr(args[0] - 4)
}

export let opFuncs : Record<number, Function> = {
    0x20: ADD,
    0x24: SUB,
    0x18: MUL,
    0x1C: DIV,
    0xE3: SETL,
    0x00: TRAP,
    0xF0: JMP,
}