import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


export class Item {
  // Define the properties of the Item class
  id: number;
  name: string;
  description: string;
}


@Entity()
export class ItemsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}