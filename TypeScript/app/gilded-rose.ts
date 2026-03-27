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

function increaseQuality(item: Item): void {
  if (item.quality < 50) {
    item.quality += 1;
  }
}

function decreaseQuality(item: Item): void {
  if (item.quality > 0) {
    item.quality -= 1;
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

      if (!isAgedBrie(item) && !isBackstagePass(item)) {
        if (!isSulfuras(item)) {
          decreaseQuality(item);
        }
      } else {
        increaseQuality(item);
        if (isBackstagePass(item)) {
          if (item.sellIn < 11) {
            increaseQuality(item);
          }
          if (item.sellIn < 6) {
            increaseQuality(item);
          }
        }
      }
      if (!isSulfuras(item)) {
        item.sellIn -= 1;
      }
      if (item.sellIn < 0) {
        if (!isAgedBrie(item)) {
          if (!isBackstagePass(item)) {
            if (!isSulfuras(item)) {
              decreaseQuality(item);
            }
          } else {
            item.quality = 0;
          }
        } else {
          increaseQuality(item);
        }
      }
    }

    return this.items;
  }
}
