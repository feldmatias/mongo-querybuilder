import {IMongoQuery, MongoFieldProjection} from '..';

type IConcat = {
    type: 'field' | 'string';
    value: string;
};

export class MongoStringConcat extends MongoFieldProjection {
    private fields: IConcat[];

    constructor(...fields: IConcat[]) {
        super();
        this.fields = fields;
    }

    concatField(field: string): MongoStringConcat {
        return new MongoStringConcat(...this.fields, {
            type: 'field',
            value: field,
        });
    }

    concatString(value: string): MongoStringConcat {
        return new MongoStringConcat(...this.fields, {type: 'string', value});
    }

    toMongo(): IMongoQuery {
        return {
            $concat: this.fields.map(this.mapConcatField),
        };
    }

    private mapConcatField(mapConcatField: IConcat): string {
        switch (mapConcatField.type) {
            case 'field':
                return `$${mapConcatField.value}`;
            case 'string':
                return mapConcatField.value;
        }
    }
}

export function StringConcat(...fields: IConcat[]): MongoStringConcat {
    return new MongoStringConcat(...fields);
}
