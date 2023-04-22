import mockTask, { MockTaskConfig } from './mockTask';

describe('mockTask', () => {
  // Without config
  it('should return a Task', () => {
    const task = mockTask({});
    expect(task).toHaveProperty('title');
    expect(task).toHaveProperty('description');
    expect(task).toHaveProperty('id');
    expect(task).toHaveProperty('status');
    expect(task).toHaveProperty('createdAt');
    expect(task).toHaveProperty('updatedAt');
    expect(task).toHaveProperty('ownerId');
  });
  // With config
  it('should return a Task with status false if config.status is false', () => {
    // Test array of tasks with status false because faker could also return false
    const tasks = Array(10)
      .fill(null)
      .map(() => mockTask({ status: false }));
    tasks.forEach(task => {
      expect(task.status).toBe(false);
    });
  });
  it('should return a Task with status true if config.status is true', () => {
    // Test array of tasks with status true because faker could also return true
    const tasks = Array(10)
      .fill(null)
      .map(() => mockTask({ status: true }));
    tasks.forEach(task => {
      expect(task.status).toBe(true);
    });
  });
  it('should return a Task with id equal to config.id', () => {
    const id = 1;
    const task = mockTask({ id });
    expect(task.id).toBe(id);
  });
  it('should return a Task with title equal to config.title', () => {
    const title = 'Test title';
    const task = mockTask({ title });
    expect(task.title).toBe(title);
  });
  it('should return a Task with description equal to config.description', () => {
    const description = 'Test description';
    const task = mockTask({ description });
    expect(task.description).toBe(description);
  });
  it('should return a Task with createdAt equal to config.createdAt', () => {
    const createdAt = new Date();
    const task = mockTask({ createdAt });
    expect(task.createdAt).toBe(createdAt);
  });
  it('should return a Task with updatedAt equal to config.updatedAt', () => {
    const updatedAt = new Date();
    const task = mockTask({ updatedAt });
    expect(task.updatedAt).toBe(updatedAt);
  });
  it('should return a Task with ownerId equal to config.ownerId', () => {
    const ownerId = 1;
    const task = mockTask({ ownerId });
    expect(task.ownerId).toBe(ownerId);
  });
  it('should return a custom task according to the config', () => {
    const config: MockTaskConfig = {
      id: 1,
      title: 'Test title',
      description: 'Test description',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: 1,
    };

    const task = mockTask(config);
    expect(task.id).toBe(config.id);
    expect(task.title).toBe(config.title);
    expect(task.description).toBe(config.description);
    expect(task.status).toBe(config.status);
    expect(task.createdAt).toBe(config.createdAt);
    expect(task.updatedAt).toBe(config.updatedAt);
    expect(task.ownerId).toBe(config.ownerId);
  });
});
