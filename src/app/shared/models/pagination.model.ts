export interface IPagination<T> {
    count: number,
    previous: string | null,
    next: string | null,
    totalPages: number,
    pageSize: number,
    items: T[]
}

export class Pagination<T> implements IPagination<T> {
    count: number = 10;
    previous: string | null = null;
    next: string | null = null;
    totalPages: number = 0;
    pageSize: number = 10;
    items: T[] = [];

    constructor(init: Partial<IPagination<T>>) {
        console.log(init)
        Object.assign(this, {
            ...init,
            totalPages: Math.ceil((init.count ?? 1) / (init.pageSize ?? 1))
        });
        console.log(this)
    }
}