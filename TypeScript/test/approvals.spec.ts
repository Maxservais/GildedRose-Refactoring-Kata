import { execSync } from 'node:child_process';

/**
 * This test uses Vitest Snapshot, similar to [Jest Snapshot](https://goo.gl/fbAQLP).
 *
 * It runs the golden-master text test for 30 days and snapshots the full output.
 * This acts as a safety net: any change in behavior across any item type will
 * show up as a snapshot diff.
 */

describe('Gilded Rose Approval', () => {
  it('should match 30-day golden master', () => {
    const consoleOutput = execSync(
      'ts-node test/golden-master-text-test.ts 30',
      { encoding: 'utf-8' }
    );

    expect(consoleOutput).toMatchSnapshot();
  });
});
