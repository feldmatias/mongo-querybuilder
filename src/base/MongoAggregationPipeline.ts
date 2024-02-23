import {
    IMongoQuery,
    Match,
    MongoAggregation,
    MongoMatcher,
    Sort,
    SortDirection,
} from '../index';

export class MongoAggregationPipeline {
    private pipeline: MongoAggregation[];

    constructor() {
        this.pipeline = [];
    }

    match(matcher: MongoMatcher): this {
        this.pipeline.push(Match(matcher));
        return this;
    }

    sort(field: string, direction: SortDirection): this {
        this.pipeline.push(Sort(field, direction));
        return this;
    }

    toMongo(): IMongoQuery[] {
        return this.pipeline.map(aggregation => aggregation.toMongo());
    }
}
