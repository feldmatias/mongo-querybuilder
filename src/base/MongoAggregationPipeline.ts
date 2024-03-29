import {
    IMongoQuery,
    Match,
    MongoAggregation,
    MongoFieldProjection,
    MongoGroupBy,
    MongoMatch,
    MongoMatcher,
    MongoPagination,
    MongoProject,
    MongoSort,
    Project,
    Sort,
    SortDirection,
} from '../index';

export class MongoAggregationPipeline {
    private pipeline: MongoAggregation[];

    constructor() {
        this.pipeline = [];
    }

    match(matcher: MongoMatcher): this {
        const lastAggregation = this.getLastAggregation();
        if (lastAggregation instanceof MongoMatch) {
            this.pipeline[this.pipeline.length - 1] =
                lastAggregation.andMatch(matcher);
        } else {
            this.pipeline.push(Match(matcher));
        }
        return this;
    }

    sort(field: string, direction: SortDirection): this {
        const lastAggregation = this.getLastAggregation();
        if (lastAggregation instanceof MongoSort) {
            this.pipeline[this.pipeline.length - 1] = lastAggregation.andSort(
                field,
                direction
            );
        } else {
            this.pipeline.push(Sort(field, direction));
        }
        return this;
    }

    group(operation: MongoGroupBy): this {
        this.pipeline.push(operation);
        return this;
    }

    project(field: string, projection?: MongoFieldProjection): this {
        const lastAggregation = this.getLastAggregation();
        if (lastAggregation instanceof MongoProject) {
            this.pipeline[this.pipeline.length - 1] =
                lastAggregation.andProject(field, projection);
        } else {
            this.pipeline.push(Project(field, projection));
        }
        return this;
    }

    paginate(pagination: MongoPagination): this {
        this.pipeline.push(...pagination.toAggregation());
        return this;
    }

    toMongo(): IMongoQuery[] {
        return this.pipeline.map(aggregation => aggregation.toMongo());
    }

    private getLastAggregation(): MongoAggregation | undefined {
        return this.pipeline[this.pipeline.length - 1];
    }
}
