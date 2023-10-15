export type AssetGeneratorContext = {
    assetName: string;
    outFile: string;
};

export type AssetGenerator = (ctx: AssetGeneratorContext) => Promise<string | Buffer> | string | Buffer;
