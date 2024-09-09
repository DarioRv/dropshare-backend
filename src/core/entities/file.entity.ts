import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  size: number;

  @Column({ unique: true })
  url: string;

  @Column({ unique: true })
  slug: string;

  @BeforeInsert()
  generateSlug() {
    this.slug = `${this.name.split('.')[0].replaceAll(' ', '-')}-${Date.now()}`;
  }
}
