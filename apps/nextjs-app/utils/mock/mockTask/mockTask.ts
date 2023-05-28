import {Task} from '@prisma/client';
import {faker} from '@faker-js/faker';

export interface MockTaskConfig {
    status?: boolean;
    id?: number;
    title?: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
    ownerId?: number;
}

const mockTask = (config: MockTaskConfig): Task => {
    return {
        id: config.id || faker.datatype.number(),
        title: config.title || faker.lorem.words(3),
        description: config.description || faker.lorem.words(10),
        status: config.hasOwnProperty('status') ? (config.status as boolean) : faker.datatype.boolean(),
        createdAt: config.createdAt || faker.date.past(),
        updatedAt: config.updatedAt || faker.date.past(),
        ownerId: config.ownerId || faker.datatype.number(),
    };
};

export default mockTask;
