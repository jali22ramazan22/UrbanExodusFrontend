import {Injectable, OnInit} from "@angular/core";
import {NavbarLoaderService} from "../../../shared/services/navbar-loader.service";
import {navbarModel} from "../../../shared/models/UIModels/navbarModel";
import {BehaviorSubject} from "rxjs";
import {Item} from "../../../shared/models/itemsModels/item.model";
@Injectable({
  providedIn: 'root'
  })
export class MarketService{
  public marketCategoriesItems: navbarModel[];
  selectedCategorySubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  selectedSortingSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  selectedProviderSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  openDetailsSubject: BehaviorSubject<Item> = new BehaviorSubject<Item>(null);


  //hardcoded
  ItemsListSubject: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(this.fetchItems());
  InventoryListSubject: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(this.getInventory());

  constructor(private navbarLoaderService: NavbarLoaderService) {
    this.navbarLoaderService.buildNavbarArray('market', 'categories')
      .subscribe(navbar => this.marketCategoriesItems= navbar);
  }

  filterAndSortItems(selectedCategory: string, order?: string, transactionType?: string, provider?: any,){
    let selectedItems: Item[] = null;
    let itemList = null
    if(transactionType === 'buy') {
      itemList = this.ItemsListSubject.getValue()
    } else if(transactionType === 'sell'){
      itemList = this.InventoryListSubject.getValue()
    } else {
      return null;
    }
    if (selectedCategory) {
      selectedItems = itemList
        .filter(item => {
          return item.itemCategory === selectedCategory
            && (provider? item.owner === provider : true);
        }); //sorting the items by provider if explicitly chosen by the player
      this.sortItems(order, selectedItems);
    }
    return selectedItems
  }

  sortItems(order: string, selectedItems: Item[]){
    if (!order) {
      return;
    }
    selectedItems.sort((first, second) => {
      if (order === 'decrease') {
        return second.price - first.price;
      } else if (order === 'increase') {
        return first.price - second.price;
      }
      return 0;
    });
  }


  fetchItems(): Item[] {
    return [
      // Оружие
      new Item('AK-47', 'A powerful firearm.', 'Оружие', 10, false, 'kz', 1500, 'firearm.png'),
      new Item('M4A1', 'A reliable rifle.', 'Оружие', 9, false, 'nato', 1600, 'firearm.png'),
      new Item('Glock 17', 'A compact handgun.', 'Оружие', 5, false, 'nato', 700, 'firearm.png'),
      new Item('Desert Eagle', 'A heavy handgun.', 'Оружие', 7, false, 'nato', 1200, 'firearm.png'),
      new Item('MP5', 'A compact submachine gun.', 'Оружие', 6, false, 'nato', 1300, 'firearm.png'),
      new Item('Remington 870', 'A reliable shotgun.', 'Оружие', 8, false, 'nato', 1100, 'firearm.png'),
      new Item('Barrett M82', 'A powerful sniper rifle.', 'Оружие', 10, false, 'nato', 2500, 'firearm.png'),
      new Item('FN SCAR', 'A modular rifle.', 'Оружие', 9, false, 'nato', 1800, 'firearm.png'),
      new Item('Uzi', 'A compact submachine gun.', 'Оружие', 6, false, 'nato', 1000, 'firearm.png'),
      new Item('Beretta 92', 'A popular handgun.', 'Оружие', 5, false, 'nato', 800, 'firearm.png'),

      // Броня
      new Item('Kevlar Vest', 'Protective armor.', 'Броня', 8, false, 'nato', 1200, 'armor.png'),
      new Item('Steel Armor', 'Heavy protective armor.', 'Броня', 10, false, 'kz', 1500, 'armor.png'),
      new Item('Tactical Vest', 'Light tactical vest.', 'Броня', 6, false, 'kz', 900, 'armor.png'),
      new Item('Ballistic Helmet', 'Protective headgear.', 'Броня', 7, false, 'kz', 1100, 'armor.png'),
      new Item('Ceramic Plates', 'Replaceable armor plates.', 'Броня', 9, false, 'kz', 1400, 'armor.png'),
      new Item('Chainmail', 'Medieval armor.', 'Броня', 5, false, 'nato', 1000, 'armor.png'),
      new Item('Body Armor', 'Basic protective armor.', 'Броня', 6, false, 'nato', 800, 'armor.png'),
      new Item('Exoskeleton', 'Advanced protective suit.', 'Броня', 10, false, 'nato', 2000, 'armor.png'),
      new Item('Light Armor', 'Lightweight protective armor.', 'Броня', 7, false, 'nato', 1100, 'armor.png'),
      new Item('Police Vest', 'Standard issue police vest.', 'Броня', 6, false, 'nato', 950, 'armor.png'),

      // Разгруз
      new Item('Tactical Vest', 'A useful tactical vest.', 'Разгруз', 5, false, 'John Smith', 500, 'tactic.png'),
      new Item('Combat Vest', 'Durable combat vest.', 'Разгруз', 6, false, 'Jane Doe', 600, 'tactic.png'),
      new Item('Field Vest', 'Vest with many pockets.', 'Разгруз', 4, false, 'John Doe', 450, 'tactic.png'),
      new Item('Light Tactical Vest', 'Light and durable.', 'Разгруз', 5, false, 'Jane Smith', 550, 'tactic.png'),
      new Item('Heavy Tactical Vest', 'Heavy duty tactical vest.', 'Разгруз', 7, false, 'John Smith', 700, 'tactic.png'),
      new Item('Covert Vest', 'Vest for covert operations.', 'Разгруз', 6, false, 'Jane Doe', 650, 'tactic.png'),
      new Item('Stealth Vest', 'Vest designed for stealth.', 'Разгруз', 5, false, 'John Doe', 500, 'tactic.png'),
      new Item('Desert Vest', 'Vest for desert operations.', 'Разгруз', 4, false, 'Jane Smith', 450, 'tactic.png'),
      new Item('Urban Vest', 'Vest for urban combat.', 'Разгруз', 5, false, 'John Smith', 500, 'tactic.png'),
      new Item('Jungle Vest', 'Vest for jungle operations.', 'Разгруз', 6, false, 'Jane Doe', 600, 'tactic.png'),

      // Патроны
      new Item('9mm Bullets', 'Ammo for 9mm firearms.', 'Патроны', 3, false, 'Jane Smith', 100, 'ammo.png'),
      new Item('5.56mm Bullets', 'Ammo for 5.56mm rifles.', 'Патроны', 4, false, 'John Doe', 120, 'ammo.png'),
      new Item('7.62mm Bullets', 'Ammo for 7.62mm rifles.', 'Патроны', 5, false, 'Jane Doe', 140, 'ammo.png'),
      new Item('.45 ACP Bullets', 'Ammo for .45 ACP firearms.', 'Патроны', 3, false, 'John Smith', 110, 'ammo.png'),
      new Item('.50 BMG Bullets', 'Ammo for .50 BMG rifles.', 'Патроны', 6, false, 'Jane Smith', 200, 'ammo.png'),
      new Item('12 Gauge Shells', 'Ammo for shotguns.', 'Патроны', 4, false, 'John Doe', 130, 'ammo.png'),
      new Item('.308 Win Bullets', 'Ammo for .308 Win rifles.', 'Патроны', 5, false, 'Jane Doe', 150, 'ammo.png'),
      new Item('9x19mm Bullets', 'Ammo for 9x19mm firearms.', 'Патроны', 3, false, 'John Smith', 100, 'ammo.png'),
      new Item('.357 Magnum Bullets', 'Ammo for .357 Magnum firearms.', 'Патроны', 4, false, 'Jane Smith', 120, 'ammo.png'),
      new Item('.338 Lapua Bullets', 'Ammo for .338 Lapua rifles.', 'Патроны', 6, false, 'John Doe', 180, 'ammo.png'),

      // Медицина
      new Item('First Aid Kit', 'Medical supplies.', 'Медицина', 7, true, 'John Doe', 300, 'medicine.png'),
      new Item('Bandages', 'Simple bandages.', 'Медицина', 2, false, 'Jane Doe', 50, 'medicine.png'),
      new Item('Medkit', 'Complete medical kit.', 'Медицина', 5, false, 'John Smith', 200, 'medicine.png'),
      new Item('Painkillers', 'Pain relief medication.', 'Медицина', 3, false, 'Jane Smith', 80, 'medicine.png'),
      new Item('Antibiotics', 'Infection-fighting drugs.', 'Медицина', 6, false, 'John Doe', 150, 'medicine.png'),
      new Item('Syringes', 'Medical syringes.', 'Медицина', 4, false, 'Jane Doe', 100, 'medicine.png'),
      new Item('Splints', 'Used to stabilize fractures.', 'Медицина', 3, false, 'John Smith', 70, 'medicine.png'),
      new Item('Surgical Kit', 'Tools for minor surgery.', 'Медицина', 8, true, 'Jane Smith', 400, 'medicine.png'),
      new Item('Trauma Kit', 'Kit for treating trauma.', 'Медицина', 7, false, 'John Doe', 350, 'medicine.png'),
      new Item('Burn Cream', 'Treatment for burns.', 'Медицина', 2, false, 'Jane Doe', 60, 'medicine.png'),

      // Еда
      new Item('Canned Food', 'Non-perishable food.', 'Еда', 2, false, 'Jane Doe', 50, 'food.png'),
      new Item('MRE', 'Meal Ready to Eat.', 'Еда', 3, false, 'John Smith', 100, 'food.png'),
      new Item('Protein Bars', 'High-energy bars.', 'Еда', 1, false, 'Jane Smith', 30, 'food.png'),
      new Item('Cereal', 'Breakfast cereal.', 'Еда', 2, false, 'John Doe', 40, 'food.png'),
      new Item('Dried Fruit', 'Nutritious dried fruit.', 'Еда', 2, false, 'Jane Doe', 50, 'food.png'),
      new Item('Canned Soup', 'Ready to eat soup.', 'Еда', 2, false, 'John Smith', 60, 'food.png'),
      new Item('Instant Noodles', 'Quick meal option.', 'Еда', 1, false, 'Jane Smith', 20, 'food.png'),
      new Item('Jerky', 'Dried meat.', 'Еда', 3, false, 'John Doe', 70, 'food.png'),
      new Item('Crackers', 'Dry, crispy snack.', 'Еда', 1, false, 'Jane Doe', 30, 'food.png'),
      new Item('Peanut Butter', 'Nutritious spread.', 'Еда', 3, false, 'John Smith', 90, 'food.png'),

      // Обвес
      new Item('Scope', 'Optics for firearms.', 'Обвес', 6, false, 'John Smith', 250, 'optics.png'),
      new Item('Silencer', 'Reduces noise.', 'Обвес', 5, false, 'Jane Doe', 300, 'optics.png'),
      new Item('Extended Magazine', 'Increases ammo capacity.', 'Обвес', 4, false, 'John Doe', 200, 'optics.png'),
      new Item('Laser Sight', 'Improves accuracy.', 'Обвес', 3, false, 'Jane Smith', 150, 'optics.png'),
      new Item('Grip', 'Improves stability.', 'Обвес', 2, false, 'John Doe', 100, 'optics.png'),
      new Item('Bipod', 'Stabilizes firearm.', 'Обвес', 5, false, 'Jane Doe', 250, 'optics.png'),
      new Item('Flashlight', 'Provides illumination.', 'Обвес', 3, false, 'John Smith', 120, 'optics.png'),
      new Item('Muzzle Brake', 'Reduces recoil.', 'Обвес', 4, false, 'Jane Smith', 200, 'optics.png'),
      new Item('Stock', 'Improves handling.', 'Обвес', 3, false, 'John Doe', 150, 'optics.png'),
      new Item('Foregrip', 'Improves control.', 'Обвес', 2, false, 'Jane Doe', 100, 'optics.png'),

      // Материалы
      new Item('Wood Planks', 'Building materials.', 'Материалы', 4, false, 'Jane Smith', 200, 'build.png'),
      new Item('Steel Beams', 'Strong structural support.', 'Материалы', 6, false, 'John Doe', 400, 'build.png'),
      new Item('Concrete', 'Building material.', 'Материалы', 5, false, 'Jane Doe', 300, 'build.png'),
      new Item('Bricks', 'Used for building walls.', 'Материалы', 3, false, 'John Smith', 150, 'build.png'),
      new Item('Nails', 'Used to fasten materials.', 'Материалы', 2, false, 'Jane Smith', 50, 'build.png'),
      new Item('Glass', 'Transparent building material.', 'Материалы', 4, false, 'John Doe', 250, 'build.png'),
      new Item('Cement', 'Used in construction.', 'Материалы', 3, false, 'Jane Doe', 200, 'build.png'),
      new Item('Insulation', 'Reduces heat loss.', 'Материалы', 4, false, 'John Smith', 300, 'build.png'),
      new Item('Plywood', 'Versatile building material.', 'Материалы', 2, false, 'Jane Smith', 100, 'build.png'),
      new Item('Tiles', 'Used for flooring.', 'Материалы', 3, false, 'John Doe', 150, 'build.png')
    ];
  }


  private getInventory() {
    return [
      // Оружие
      new Item('AK-47', 'A powerful firearm.', 'Оружие', 10, false, 'kz', 1500, 'firearm.png'),
      new Item('M4A1', 'A reliable rifle.', 'Оружие', 9, false, 'nato', 1600, 'firearm.png'),
      new Item('Glock 17', 'A compact handgun.', 'Оружие', 5, false, 'nato', 700, 'firearm.png'),
      new Item('Desert Eagle', 'A heavy handgun.', 'Оружие', 7, false, 'nato', 1200, 'firearm.png'),
      new Item('MP5', 'A compact submachine gun.', 'Оружие', 6, false, 'nato', 1300, 'firearm.png'),
      new Item('Remington 870', 'A reliable shotgun.', 'Оружие', 8, false, 'nato', 1100, 'firearm.png'),
      new Item('Barrett M82', 'A powerful sniper rifle.', 'Оружие', 10, false, 'nato', 2500, 'firearm.png'),
      new Item('FN SCAR', 'A modular rifle.', 'Оружие', 9, false, 'nato', 1800, 'firearm.png'),
      new Item('Uzi', 'A compact submachine gun.', 'Оружие', 6, false, 'nato', 1000, 'firearm.png'),
      new Item('Beretta 92', 'A popular handgun.', 'Оружие', 5, false, 'nato', 800, 'firearm.png'),

      // Броня
      new Item('Kevlar Vest', 'Protective armor.', 'Броня', 8, false, 'nato', 1200, 'armor.png'),
      new Item('Steel Armor', 'Heavy protective armor.', 'Броня', 10, false, 'kz', 1500, 'armor.png'),
      new Item('Tactical Vest', 'Light tactical vest.', 'Броня', 6, false, 'kz', 900, 'armor.png'),
      new Item('Ballistic Helmet', 'Protective headgear.', 'Броня', 7, false, 'kz', 1100, 'armor.png'),
      new Item('Ceramic Plates', 'Replaceable armor plates.', 'Броня', 9, false, 'kz', 1400, 'armor.png'),
      new Item('Chainmail', 'Medieval armor.', 'Броня', 5, false, 'nato', 1000, 'armor.png'),
      new Item('Body Armor', 'Basic protective armor.', 'Броня', 6, false, 'nato', 800, 'armor.png'),
      new Item('Exoskeleton', 'Advanced protective suit.', 'Броня', 10, false, 'nato', 2000, 'armor.png'),
      new Item('Light Armor', 'Lightweight protective armor.', 'Броня', 7, false, 'nato', 1100, 'armor.png'),
      new Item('Police Vest', 'Standard issue police vest.', 'Броня', 6, false, 'nato', 950, 'armor.png'),

      // Разгруз
      new Item('Tactical Vest', 'A useful tactical vest.', 'Разгруз', 5, false, 'John Smith', 500, 'tactic.png'),
      new Item('Combat Vest', 'Durable combat vest.', 'Разгруз', 6, false, 'Jane Doe', 600, 'tactic.png'),
      new Item('Field Vest', 'Vest with many pockets.', 'Разгруз', 4, false, 'John Doe', 450, 'tactic.png'),
      new Item('Light Tactical Vest', 'Light and durable.', 'Разгруз', 5, false, 'Jane Smith', 550, 'tactic.png'),
      new Item('Heavy Tactical Vest', 'Heavy duty tactical vest.', 'Разгруз', 7, false, 'John Smith', 700, 'tactic.png'),
      new Item('Covert Vest', 'Vest for covert operations.', 'Разгруз', 6, false, 'Jane Doe', 650, 'tactic.png'),
      new Item('Stealth Vest', 'Vest designed for stealth.', 'Разгруз', 5, false, 'John Doe', 500, 'tactic.png'),
      new Item('Desert Vest', 'Vest for desert operations.', 'Разгруз', 4, false, 'Jane Smith', 450, 'tactic.png'),
      new Item('Urban Vest', 'Vest for urban combat.', 'Разгруз', 5, false, 'John Smith', 500, 'tactic.png'),
      new Item('Jungle Vest', 'Vest for jungle operations.', 'Разгруз', 6, false, 'Jane Doe', 600, 'tactic.png'),

      // Патроны
      new Item('9mm Bullets', 'Ammo for 9mm firearms.', 'Патроны', 3, false, 'Jane Smith', 100, 'ammo.png'),
      new Item('5.56mm Bullets', 'Ammo for 5.56mm rifles.', 'Патроны', 4, false, 'John Doe', 120, 'ammo.png'),
      new Item('7.62mm Bullets', 'Ammo for 7.62mm rifles.', 'Патроны', 5, false, 'Jane Doe', 140, 'ammo.png'),
      new Item('.45 ACP Bullets', 'Ammo for .45 ACP firearms.', 'Патроны', 3, false, 'John Smith', 110, 'ammo.png'),
      new Item('.50 BMG Bullets', 'Ammo for .50 BMG rifles.', 'Патроны', 6, false, 'Jane Smith', 200, 'ammo.png'),
      new Item('12 Gauge Shells', 'Ammo for shotguns.', 'Патроны', 4, false, 'John Doe', 130, 'ammo.png'),
      new Item('.308 Win Bullets', 'Ammo for .308 Win rifles.', 'Патроны', 5, false, 'Jane Doe', 150, 'ammo.png'),
      new Item('9x19mm Bullets', 'Ammo for 9x19mm firearms.', 'Патроны', 3, false, 'John Smith', 100, 'ammo.png'),
      new Item('.357 Magnum Bullets', 'Ammo for .357 Magnum firearms.', 'Патроны', 4, false, 'Jane Smith', 120, 'ammo.png'),
      new Item('.338 Lapua Bullets', 'Ammo for .338 Lapua rifles.', 'Патроны', 6, false, 'John Doe', 180, 'ammo.png'),

      // Медицина
      new Item('First Aid Kit', 'Medical supplies.', 'Медицина', 7, true, 'John Doe', 300, 'medicine.png'),
      new Item('Bandages', 'Simple bandages.', 'Медицина', 2, false, 'Jane Doe', 50, 'medicine.png'),
      new Item('Medkit', 'Complete medical kit.', 'Медицина', 5, false, 'John Smith', 200, 'medicine.png'),
      new Item('Painkillers', 'Pain relief medication.', 'Медицина', 3, false, 'Jane Smith', 80, 'medicine.png'),
      new Item('Antibiotics', 'Infection-fighting drugs.', 'Медицина', 6, false, 'John Doe', 150, 'medicine.png'),
      new Item('Syringes', 'Medical syringes.', 'Медицина', 4, false, 'Jane Doe', 100, 'medicine.png'),
      new Item('Splints', 'Used to stabilize fractures.', 'Медицина', 3, false, 'John Smith', 70, 'medicine.png'),
      new Item('Surgical Kit', 'Tools for minor surgery.', 'Медицина', 8, true, 'Jane Smith', 400, 'medicine.png'),
      new Item('Trauma Kit', 'Kit for treating trauma.', 'Медицина', 7, false, 'John Doe', 350, 'medicine.png'),
      new Item('Burn Cream', 'Treatment for burns.', 'Медицина', 2, false, 'Jane Doe', 60, 'medicine.png'),

      // Еда
      new Item('Canned Food', 'Non-perishable food.', 'Еда', 2, false, 'Jane Doe', 50, 'food.png'),
      new Item('MRE', 'Meal Ready to Eat.', 'Еда', 3, false, 'John Smith', 100, 'food.png'),
      new Item('Protein Bars', 'High-energy bars.', 'Еда', 1, false, 'Jane Smith', 30, 'food.png'),
      new Item('Cereal', 'Breakfast cereal.', 'Еда', 2, false, 'John Doe', 40, 'food.png'),
      new Item('Dried Fruit', 'Nutritious dried fruit.', 'Еда', 2, false, 'Jane Doe', 50, 'food.png'),
      new Item('Canned Soup', 'Ready to eat soup.', 'Еда', 2, false, 'John Smith', 60, 'food.png'),
      new Item('Instant Noodles', 'Quick meal option.', 'Еда', 1, false, 'Jane Smith', 20, 'food.png'),
      new Item('Jerky', 'Dried meat.', 'Еда', 3, false, 'John Doe', 70, 'food.png'),
      new Item('Crackers', 'Dry, crispy snack.', 'Еда', 1, false, 'Jane Doe', 30, 'food.png'),
      new Item('Peanut Butter', 'Nutritious spread.', 'Еда', 3, false, 'John Smith', 90, 'food.png'),

      // Обвес
      new Item('Scope', 'Optics for firearms.', 'Обвес', 6, false, 'John Smith', 250, 'optics.png'),
      new Item('Silencer', 'Reduces noise.', 'Обвес', 5, false, 'Jane Doe', 300, 'optics.png'),
      new Item('Extended Magazine', 'Increases ammo capacity.', 'Обвес', 4, false, 'John Doe', 200, 'optics.png'),
      new Item('Laser Sight', 'Improves accuracy.', 'Обвес', 3, false, 'Jane Smith', 150, 'optics.png'),
      new Item('Grip', 'Improves stability.', 'Обвес', 2, false, 'John Doe', 100, 'optics.png'),
      new Item('Bipod', 'Stabilizes firearm.', 'Обвес', 5, false, 'Jane Doe', 250, 'optics.png'),
      new Item('Flashlight', 'Provides illumination.', 'Обвес', 3, false, 'John Smith', 120, 'optics.png'),
      new Item('Muzzle Brake', 'Reduces recoil.', 'Обвес', 4, false, 'Jane Smith', 200, 'optics.png'),
      new Item('Stock', 'Improves handling.', 'Обвес', 3, false, 'John Doe', 150, 'optics.png'),
      new Item('Foregrip', 'Improves control.', 'Обвес', 2, false, 'Jane Doe', 100, 'optics.png'),

      // Материалы
      new Item('Wood Planks', 'Building materials.', 'Материалы', 4, false, 'Jane Smith', 200, 'build.png'),
      new Item('Steel Beams', 'Strong structural support.', 'Материалы', 6, false, 'John Doe', 400, 'build.png'),
      new Item('Concrete', 'Building material.', 'Материалы', 5, false, 'Jane Doe', 300, 'build.png'),
      new Item('Bricks', 'Used for building walls.', 'Материалы', 3, false, 'John Smith', 150, 'build.png'),
      new Item('Nails', 'Used to fasten materials.', 'Материалы', 2, false, 'Jane Smith', 50, 'build.png'),
      new Item('Glass', 'Transparent building material.', 'Материалы', 4, false, 'John Doe', 250, 'build.png'),
      new Item('Cement', 'Used in construction.', 'Материалы', 3, false, 'Jane Doe', 200, 'build.png'),
      new Item('Insulation', 'Reduces heat loss.', 'Материалы', 4, false, 'John Smith', 300, 'build.png'),
      new Item('Plywood', 'Versatile building material.', 'Материалы', 2, false, 'Jane Smith', 100, 'build.png'),
      new Item('Tiles', 'Used for flooring.', 'Материалы', 3, false, 'John Doe', 150, 'build.png')
    ];
  }
}
