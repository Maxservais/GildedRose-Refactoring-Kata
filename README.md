# Gilded Rose Refactoring Kata

My solution to the [Gilded Rose Refactoring Kata](https://github.com/emilybache/GildedRose-Refactoring-Kata) in TypeScript.

See the full [requirements specification](GildedRoseRequirements.md).

## Getting started

```bash
cd TypeScript
npm install
```

### Run tests

```bash
npm test              # watch mode
npm run test:run      # single run
npm run test:coverage # with coverage report
```

## Approach

I tackled this kata in three phases, each reflected in the commit history:

### 1. Characterization tests

Before touching the production code, I wrote two layers of tests:

- **Unit tests** (`test/gilded-rose.spec.ts`) — one `describe` block per item type, testing every business rule and boundary case. These read like a specification and pinpoint exactly which rule breaks if a refactoring goes wrong.
- **Golden-master snapshot test** (`test/approvals.spec.ts`) — uses the provided `golden-master-text-test.ts` fixture to run all items through 30 days and snapshots the full output. This catches any regression I might not have thought to write a unit test for.

### 2. Incremental refactoring

I refactored the nested `if/else` spaghetti in small, safe steps:

1. Introduced a local `item` variable to remove `this.items[i]` noise
2. Extracted predicate helpers (`isAgedBrie`, `isBackstagePass`, `isSulfuras`)
3. Extracted `increaseQuality` / `decreaseQuality` helpers with built-in bounds
4. Reorganized the logic into clear branches
5. Extracted each branch into its own function (`updateAgedBrie`, `updateBackstagePass`, `updateNormalItem`)

### 3. Conjured items

With the refactoring done, adding Conjured support was straightforward: one predicate, one updater function, one branch in the loop.

## Key design decisions

- **`startsWith('Conjured')` matching**: the spec describes "Conjured" as a category of items, not a single SKU. This is consistent with how other items are named in the spec (e.g. "Sulfuras" refers to "Sulfuras, Hand of Ragnaros").

## Constraints respected

- The `Item` class was not modified
- All existing behavior was characterized with tests before any refactoring
- All 32 tests pass
