import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './item.entity';

@Injectable()
export class ItemsService {
  // Şimdilik in-memory mock store
  private items: Item[] = [
    { id: 1, name: 'Örnek Ürün 1', price: 10 },
    { id: 2, name: 'Örnek Ürün 2', price: 20 },
  ];
  private nextId = this.items.length + 1;

  findAll(): Item[] {
    return this.items;
  }

  create(createItemDto: CreateItemDto): Item {
    const newItem: Item = {
      id: this.nextId++,
      name: createItemDto.name,
      price: createItemDto.price,
    };
    this.items.push(newItem);
    return newItem;
  }

  /*
  // Gelecekte PostgreSQL'e geçirmek için örnek (TypeORM repository):
  // constructor(
  //   @InjectRepository(Item)
  //   private readonly itemRepository: Repository<Item>,
  // ) {}
  //
  // async findAll(): Promise<Item[]> {
  //   return this.itemRepository.find();
  // }
  //
  // async create(dto: CreateItemDto): Promise<Item> {
  //   const item = this.itemRepository.create(dto);
  //   return this.itemRepository.save(item);
  // }
  */
}
