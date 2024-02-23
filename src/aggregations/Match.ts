import {IMongoQuery, MongoAggregation, MongoMatcher} from '../index';

export class MongoMatch extends MongoAggregation {
    constructor(private matcher: MongoMatcher) {
        super();
    }

    andMatch(matcher: MongoMatcher): MongoMatch {
        return new MongoMatch(this.matcher.and(matcher));
    }

    toMongo(): IMongoQuery {
        return {
            $match: this.matcher.toMongo(),
        };
    }
}

export function Match(matcher: MongoMatcher): MongoMatch {
    return new MongoMatch(matcher);
}
