import {Match, MongoAggregation, MongoMatcher} from '../index';

export class MongoAggregationPipeline {
    private pipeline: MongoAggregation[];

    constructor() {
        this.pipeline = [];
    }

    match(matcher: MongoMatcher): this {
        this.pipeline.push(Match(matcher));
        return this;
    }

    toMongo(): object {
        return this.pipeline.map(aggregation => aggregation.toMongo());
    }
}
