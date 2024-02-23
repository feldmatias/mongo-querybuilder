import {IMongoQuery, Match, MongoAggregation, MongoMatcher} from '../index';

export class MongoAggregationPipeline {
    private pipeline: MongoAggregation[];

    constructor() {
        this.pipeline = [];
    }

    match(matcher: MongoMatcher): this {
        this.pipeline.push(Match(matcher));
        return this;
    }

    toMongo(): IMongoQuery[] {
        return this.pipeline.map(aggregation => aggregation.toMongo());
    }
}
