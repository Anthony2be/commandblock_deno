import { ensureDir } from '../deps.ts'

export interface DatapackOptions {
  namespace?: string;
  packFormat?: number;
  description?: string;
  pathToPng?: string;
}

export interface DatapackContext {
  RegisterCommand: (command: string) => void;
}

export function GenerateCtx(path: string) {
  return {
    RegisterCommand: (content: string) => {
      Deno.writeTextFile(
        path,
        `\n${content}`,
        { append: true },
      );
    }
  }
}


export function Datapack(DatapackName: string, options: DatapackOptions = {}) {
  if (!options.namespace) {
    options.namespace = DatapackName;
  }

  const path = `${DatapackName}/data/${options.namespace}/functions`

  Deno.mkdir(path, { recursive: true })
    .then(() => {
      console.log("Created directory");
    })
    .catch(() => {
      console.log("Directory already exists!");
    });

  Deno.writeTextFile(`${DatapackName}/pack.mcmeta`, JSON.stringify(
    {
      pack: {
        pack_format: options.packFormat || 10,
        description: options.description || "A datapack made with Deno",
      },
    },
  ));

  if (options.pathToPng) {
    Deno.copyFile(options.pathToPng, `${DatapackName}/pack.png`);
  }

  return {
    RegisterFunction: (FunctionName: string, callback: (ctx: DatapackContext) => void) => {
      Deno.writeTextFile(
        `${path}/${FunctionName}.mcfunction`,
        "",
      );
      callback(GenerateCtx(`${path}/${FunctionName}.mcfunction`));
    },
    // TODO(Anthony2be): ability to add multiple load functions
    RegisterLoadFunction: (FunctionName: string, callback: (ctx: DatapackContext) => void) => {
      ensureDir(`${DatapackName}/data/minecraft/tags/functions/`).then(() => {
        Deno.writeTextFile(
          `${DatapackName}/data/minecraft/tags/functions/load.json`,
          JSON.stringify({
            values: [
              `${options.namespace}:${FunctionName}`,
            ],
          }),
        );
      });
      Deno.writeTextFile(
        `${path}/${FunctionName}.mcfunction`,
        "",
      );
      callback(GenerateCtx(`${path}/${FunctionName}.mcfunction`));
    },
    // TODO(Anthony2be): ability to add multiple tick functions
    RegisterTickFunction: (FunctionName: string, callback: (ctx: DatapackContext) => void) => {
      ensureDir(`${DatapackName}/data/minecraft/tags/functions/`).then(() => {
        Deno.writeTextFile(
          `${DatapackName}/data/minecraft/tags/functions/tick.json`,
          JSON.stringify({
            values: [
              `${options.namespace}:${FunctionName}`,
            ],
          }),
        );
      });
      Deno.writeTextFile(
        `${path}/${FunctionName}.mcfunction`,
        "",
      );
      callback(GenerateCtx(`${path}/${FunctionName}.mcfunction`));
    }
  };
}
