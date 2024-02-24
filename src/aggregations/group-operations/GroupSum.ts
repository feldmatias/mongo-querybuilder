import {GroupOperation} from '../..';

export class MongoGroupSum extends GroupOperation {
    constructor(private field: string) {
        super();
    }

    toMongo() {
        return {
            $sum: `$${this.field}`,
        };
    }
}

export function Sum(field: string): MongoGroupSum {
    return new MongoGroupSum(field);
}
