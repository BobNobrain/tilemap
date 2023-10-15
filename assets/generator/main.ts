import * as path from 'path';
import * as fs from 'fs/promises';
import { mkdirp } from 'mkdirp';
import { AssetGenerator } from './types';

const required = <T>(x: T | undefined, name: string): T => {
    if (!x) {
        throw new Error(`${name} is required`);
    }
    return x;
};

type AssetGeneratorModule = {
    generate: AssetGenerator;
};

async function main(args: string[]) {
    const assetName = required(args[0], 'output filename ($1)');
    const srcDir = required(process.env.SRCDIR, 'env.SRCDIR');
    const outDir = required(process.env.OUTDIR, 'env.OUTDIR');

    const sourceFile = path.resolve(srcDir, assetName, 'index.ts');
    const targetFile = path.resolve(outDir, assetName);

    const targetDir = path.dirname(targetFile);
    await mkdirp(targetDir);

    console.log(`assetgen: ${sourceFile} >> ${targetFile}`);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const generator = require(sourceFile) as AssetGeneratorModule;
    const content = await generator.generate({ assetName, outFile: targetFile });
    if (typeof content === 'string') {
        await fs.writeFile(targetFile, content, { encoding: 'utf-8' });
    } else {
        await fs.writeFile(targetFile, content);
    }
}

main(process.argv.slice(2)).catch((err) => {
    console.error(err);
    process.exit(1);
});
