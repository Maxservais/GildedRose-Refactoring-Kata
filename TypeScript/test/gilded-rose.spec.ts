/// <reference types="vitest/globals" />
import { Item, GildedRose } from '@/gilded-rose';

function updateItem(name: string, sellIn: number, quality: number): Item {
  const inn = new GildedRose([new Item(name, sellIn, quality)]);
  inn.updateQuality();
  return inn.items[0];
}

describe('Normal items', () => {
  it('decreases quality by 1 before sell-by date', () => {
    const item = updateItem('+5 Dexterity Vest', 10, 20);
    expect(item.quality).toBe(19);
    expect(item.sellIn).toBe(9);
  });

  it('decreases quality by 2 after sell-by date', () => {
    const item = updateItem('+5 Dexterity Vest', 0, 20);
    expect(item.quality).toBe(18);
    expect(item.sellIn).toBe(-1);
  });

  it('quality never goes below 0', () => {
    const item = updateItem('+5 Dexterity Vest', 5, 0);
    expect(item.quality).toBe(0);
    expect(item.sellIn).toBe(4);
  });

  it('quality never goes below 0 after sell-by date', () => {
    const item = updateItem('+5 Dexterity Vest', 0, 0);
    expect(item.quality).toBe(0);
    expect(item.sellIn).toBe(-1);
  });

  it('still degrades by 1 on the last day before sell-by', () => {
    const item = updateItem('+5 Dexterity Vest', 1, 20);
    expect(item.quality).toBe(19);
    expect(item.sellIn).toBe(0);
  });

  it('continues to degrade by 2 well past sell-by date', () => {
    const item = updateItem('+5 Dexterity Vest', -5, 20);
    expect(item.quality).toBe(18);
    expect(item.sellIn).toBe(-6);
  });
});

describe('Aged Brie', () => {
  it('increases quality by 1 before sell-by date', () => {
    const item = updateItem('Aged Brie', 10, 20);
    expect(item.quality).toBe(21);
    expect(item.sellIn).toBe(9);
  });

  it('increases quality by 2 after sell-by date', () => {
    const item = updateItem('Aged Brie', 0, 20);
    expect(item.quality).toBe(22);
    expect(item.sellIn).toBe(-1);
  });

  it('quality never exceeds 50', () => {
    const item = updateItem('Aged Brie', 10, 50);
    expect(item.quality).toBe(50);
    expect(item.sellIn).toBe(9);
  });

  it('quality never exceeds 50 even after sell-by date', () => {
    const item = updateItem('Aged Brie', 0, 48);
    expect(item.quality).toBe(50);
    expect(item.sellIn).toBe(-1);
  });

  it('quality stays at 50 after sell-by date', () => {
    const item = updateItem('Aged Brie', 0, 50);
    expect(item.quality).toBe(50);
    expect(item.sellIn).toBe(-1);
  });
});

describe('Sulfuras, Hand of Ragnaros', () => {
  it('never changes quality or sellIn', () => {
    const item = updateItem('Sulfuras, Hand of Ragnaros', 5, 80);
    expect(item.quality).toBe(80);
    expect(item.sellIn).toBe(5);
  });

  it('quality is 80, exceeding the normal max of 50', () => {
    const item = updateItem('Sulfuras, Hand of Ragnaros', -1, 80);
    expect(item.quality).toBe(80);
    expect(item.sellIn).toBe(-1);
  });
});

describe('Backstage passes to a TAFKAL80ETC concert', () => {
  const name = 'Backstage passes to a TAFKAL80ETC concert';

  it('increases quality by 1 when more than 10 days left', () => {
    const item = updateItem(name, 15, 20);
    expect(item.quality).toBe(21);
    expect(item.sellIn).toBe(14);
  });

  it('increases quality by 1 at exactly 11 days (boundary)', () => {
    const item = updateItem(name, 11, 20);
    expect(item.quality).toBe(21);
    expect(item.sellIn).toBe(10);
  });

  it('increases quality by 2 at 10 days', () => {
    const item = updateItem(name, 10, 20);
    expect(item.quality).toBe(22);
    expect(item.sellIn).toBe(9);
  });

  it('increases quality by 2 at 6 days', () => {
    const item = updateItem(name, 6, 20);
    expect(item.quality).toBe(22);
    expect(item.sellIn).toBe(5);
  });

  it('increases quality by 3 at 5 days', () => {
    const item = updateItem(name, 5, 20);
    expect(item.quality).toBe(23);
    expect(item.sellIn).toBe(4);
  });

  it('increases quality by 3 at 3 days (mid-range)', () => {
    const item = updateItem(name, 3, 20);
    expect(item.quality).toBe(23);
    expect(item.sellIn).toBe(2);
  });

  it('increases quality by 3 at 1 day', () => {
    const item = updateItem(name, 1, 20);
    expect(item.quality).toBe(23);
    expect(item.sellIn).toBe(0);
  });

  it('drops quality to 0 after the concert', () => {
    const item = updateItem(name, 0, 20);
    expect(item.quality).toBe(0);
    expect(item.sellIn).toBe(-1);
  });

  it('quality drops to 0 even with positive quality after the concert', () => {
    const item = updateItem(name, -1, 20);
    expect(item.quality).toBe(0);
    expect(item.sellIn).toBe(-2);
  });

  it('quality never exceeds 50 (10 days, quality 49)', () => {
    const item = updateItem(name, 10, 49);
    expect(item.quality).toBe(50);
    expect(item.sellIn).toBe(9);
  });

  it('quality never exceeds 50 (5 days, quality 48)', () => {
    const item = updateItem(name, 5, 48);
    expect(item.quality).toBe(50);
    expect(item.sellIn).toBe(4);
  });

  it('quality never exceeds 50 (5 days, quality 49)', () => {
    const item = updateItem(name, 5, 49);
    expect(item.quality).toBe(50);
    expect(item.sellIn).toBe(4);
  });
});

describe('Conjured items', () => {
  it('degrades quality by 2 before sell-by date', () => {
    const item = updateItem('Conjured Mana Cake', 10, 20);
    expect(item.quality).toBe(18);
    expect(item.sellIn).toBe(9);
  });

  it('still degrades by 2 on the last day before sell-by', () => {
    const item = updateItem('Conjured Mana Cake', 1, 20);
    expect(item.quality).toBe(18);
    expect(item.sellIn).toBe(0);
  });

  it('degrades quality by 4 after sell-by date', () => {
    const item = updateItem('Conjured Mana Cake', 0, 20);
    expect(item.quality).toBe(16);
    expect(item.sellIn).toBe(-1);
  });

  it('quality never goes below 0', () => {
    const item = updateItem('Conjured Mana Cake', 5, 1);
    expect(item.quality).toBe(0);
    expect(item.sellIn).toBe(4);
  });

  it('quality never goes below 0 after sell-by date', () => {
    const item = updateItem('Conjured Mana Cake', 0, 3);
    expect(item.quality).toBe(0);
    expect(item.sellIn).toBe(-1);
  });

  it('applies to any item whose name starts with Conjured', () => {
    const item = updateItem('Conjured Elixir', 10, 20);
    expect(item.quality).toBe(18);
    expect(item.sellIn).toBe(9);
  });
});
