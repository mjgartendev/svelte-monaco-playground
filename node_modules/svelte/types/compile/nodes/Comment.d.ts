import Node from './shared/Node';
export default class Comment extends Node {
    type: 'Comment';
    data: string;
    constructor(component: any, parent: any, scope: any, info: any);
}
