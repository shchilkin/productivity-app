// generate tests for idGenerator

// Path: apps/nextjs-app/utils/idGenerator/idGenerator.test.ts

import idGenerator from './idGenerator';

describe('idGenerator', () => {
  it('should generate a unique id', () => {
    const generator = idGenerator();
    const id1 = generator.next().value;
    const id2 = generator.next().value;
    expect(id1).toBe(0);
    expect(id2).toBe(1);
  });
  it('each id should be greater than previous id', () => {
    const generator = idGenerator();
    const id1 = generator.next().value;
    const id2 = generator.next().value;
    expect(id2).toBeGreaterThan(id1);
  });
});
