import {IMongoQuery, MongoAggregation} from '../index';

export abstract class GroupOperation {
    abstract toMongo(): IMongoQuery;
}

export class MongoGroupBy extends MongoAggregation {
    private fields: string[];
    private operations: {[key: string]: GroupOperation};

    constructor(...fields: string[]) {
        super();
        this.fields = fields;
        this.operations = {};
    }

    andGroupBy(...fields: string[]): MongoGroupBy {
        const newGroup = new MongoGroupBy(...this.fields.concat(fields));
        newGroup.operations = this.operations;
        return newGroup;
    }

    aggregate(field: string, operation: GroupOperation): MongoGroupBy {
        const newGroup = new MongoGroupBy(...this.fields);
        newGroup.operations = {...this.operations, [field]: operation};
        return newGroup;
    }

    toMongo(): IMongoQuery {
        return {
            $group: {
                _id: this.getGroupId(),
                ...this.getOperations(),
            },
        };
    }

    private getGroupId(): IMongoQuery | string {
        if (this.fields.length === 1) {
            return `$${this.fields[0]}`;
        }
        const id: IMongoQuery = {};
        for (const field of this.fields) {
            id[field] = `$${field}`;
        }
        return id;
    }

    private getOperations(): IMongoQuery {
        const operations: IMongoQuery = {};
        for (const field in this.operations) {
            operations[field] = this.operations[field].toMongo();
        }
        return operations;
    }
}

export function GroupBy(...fields: string[]): MongoGroupBy {
    return new MongoGroupBy(...fields);
}
