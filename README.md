# Commandblock_deno

## What is Commandblock_Deno?
Commandblock_deno is a port of [Commandblock_py](https://github.com/skandabhairava/Datapack_generator) to Deno

## Example Usage
```ts
//Since this isnt deployed onto deno.land yet you have to import with the raw github file
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
```
