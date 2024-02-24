import {GroupOperation} from '../..';

export class MongoGroupCount extends GroupOperation {
    toMongo() {
        return {
            $sum: 1,
        };
    }
}

export function Count(): MongoGroupCount {
    return new MongoGroupCount();
}
