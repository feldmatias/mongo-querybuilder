import {Limit, MongoAggregation, MongoPagination, Skip} from '..';

export type IMongoLimitOffset = {
    page?: number;
    pageSize: number;
};

export class MongoLimitOffsetPagination extends MongoPagination {
    constructor(private pagination: IMongoLimitOffset) {
        super();
    }

    nextPage(): MongoLimitOffsetPagination {
        return new MongoLimitOffsetPagination({
            page: (this.pagination.page ?? 0) + 1,
            pageSize: this.pagination.pageSize,
        });
    }

    toAggregation(): MongoAggregation[] {
        const page = this.pagination.page ?? 0;
        if (page === 0) {
            return [Limit(this.pagination.pageSize)];
        }

        return [
            Skip(page * this.pagination.pageSize),
            Limit(this.pagination.pageSize),
        ];
    }
}

export function LimitOffsetPagination(
    pagination: IMongoLimitOffset
): MongoLimitOffsetPagination {
    return new MongoLimitOffsetPagination(pagination);
}
