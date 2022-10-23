import { Datapack } from "https://raw.githubusercontent.com/Anthony2be/commandblock_deno/main/mod.ts";

const datapack = Datapack("test")

datapack.RegisterLoadFunction("load", (ctx) => {
    ctx.RegisterCommand("say This is a load function")
})

datapack.RegisterTickFunction("tick", (ctx) => {
    ctx.RegisterCommand("say This is a tick function!")
})

datapack.RegisterFunction("normal", (ctx) => {
    ctx.RegisterCommand("say This is a normal function!")
})