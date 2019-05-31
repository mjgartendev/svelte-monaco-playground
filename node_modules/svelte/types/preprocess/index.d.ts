import { SourceMap } from 'magic-string';
export interface PreprocessorGroup {
    markup?: (options: {
        content: string;
        filename: string;
    }) => {
        code: string;
        map?: SourceMap | string;
        dependencies?: string[];
    };
    style?: Preprocessor;
    script?: Preprocessor;
}
export declare type Preprocessor = (options: {
    content: string;
    attributes: Record<string, string | boolean>;
    filename?: string;
}) => {
    code: string;
    map?: SourceMap | string;
    dependencies?: string[];
};
export default function preprocess(source: string, preprocessor: PreprocessorGroup | PreprocessorGroup[], options?: {
    filename?: string;
}): Promise<{
    code: string;
    dependencies: any[];
    toString(): string;
}>;
