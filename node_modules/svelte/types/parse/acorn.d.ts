import * as acorn from 'acorn';
export declare const parse: (source: string) => acorn.Node;
export declare const parse_expression_at: (source: string, index: number) => acorn.Node;
