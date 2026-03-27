export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

function isAgedBrie(item: Item): boolean {
  return item.name === 'Aged Brie';
}

function isBackstagePass(item: Item): boolean {
  return item.name === 'Backstage passes to a TAFKAL80ETC concert';
}

function isSulfuras(item: Item): boolean {
  return item.name === 'Sulfuras, Hand of Ragnaros';
}

function isConjured(item: Item): boolean {
  return item.name.startsWith('Conjured');
}

function increaseQuality(item: Item): void {
  if (item.quality < 50) {
    item.quality += 1;
  }
}

function decreaseQualityBy(item: Item, amount: number): void {
  item.quality = Math.max(0, item.quality - amount);
}

function decreaseQuality(item: Item): void {
  decreaseQualityBy(item, 1);
}

function updateAgedBrie(item: Item): void {
  increaseQuality(item);
  item.sellIn -= 1;
  if (item.sellIn < 0) {
    increaseQuality(item);
  }
}

function updateBackstagePass(item: Item): void {
  increaseQuality(item);
  if (item.sellIn < 11) {
    increaseQuality(item);
  }
  if (item.sellIn < 6) {
    increaseQuality(item);
  }
  item.sellIn -= 1;
  if (item.sellIn < 0) {
    item.quality = 0;
  }
}

function updateConjuredItem(item: Item): void {
  decreaseQualityBy(item, 2);
  item.sellIn -= 1;
  if (item.sellIn < 0) {
    decreaseQualityBy(item, 2);
  }
}

function updateNormalItem(item: Item): void {
  decreaseQuality(item);
  item.sellIn -= 1;
  if (item.sellIn < 0) {
    decreaseQuality(item);
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (isSulfuras(item)) {
        continue;
      }

      if (isAgedBrie(item)) {
        updateAgedBrie(item);
      } else if (isBackstagePass(item)) {
        updateBackstagePass(item);
      } else if (isConjured(item)) {
        updateConjuredItem(item);
      } else {
        updateNormalItem(item);
      }
    }

    return this.items;
  }
}
