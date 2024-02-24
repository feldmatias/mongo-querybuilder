import {IMongoQuery, MongoAggregation, MongoFieldProjection} from '../index';

type IMongoProjection = {
    field: string;
    projection?: MongoFieldProjection;
};

export class MongoProject extends MongoAggregation {
    private projections: IMongoProjection[];

    constructor(field: string, projection?: MongoFieldProjection) {
        super();
        this.projections = [{field, projection}];
    }

    andProject(field: string, projection?: MongoFieldProjection): MongoProject {
        const newProject = new MongoProject(field, projection);
        newProject.projections = [
            ...this.projections,
            ...newProject.projections,
        ];
        return newProject;
    }

    toMongo(): IMongoQuery {
        return {
            $project: this.getProjections(),
        };
    }

    private getProjections(): IMongoQuery {
        const projections: IMongoQuery = {};
        this.projections.forEach(({field, projection}) => {
            projections[field] = projection ? projection.toMongo() : 1;
        });
        return projections;
    }
}

export function Project(
    field: string,
    projection?: MongoFieldProjection
): MongoProject {
    return new MongoProject(field, projection);
}
