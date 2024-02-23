import bunjs from 'bunjs';

import { expect, test, describe } from "bun:test";

describe('Example Test', () => {
    test('should pass', () => {
        // Test logic goes here
        expect(true).toBe(true);
    });

    test('should fail', () => {
        // Test logic goes here
        expect(false).not.toBe(true);
    });
});
