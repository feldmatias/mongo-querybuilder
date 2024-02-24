import {GroupOperation} from '../..';

export class MongoGroupAvg extends GroupOperation {
    constructor(private field: string) {
        super();
    }

    toMongo() {
        return {
            $avg: `$${this.field}`,
        };
    }
}

export function Avg(field: string): MongoGroupAvg {
    return new MongoGroupAvg(field);
}
