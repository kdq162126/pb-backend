import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { WebsiteEntity } from './website.entity';

@Entity({ name: 'enterprises' })
export class EnterpriseEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  enterpriseName: string;

  @Column()
  enterpriseMail: string;

  @Column()
  enterprisePhone: string;

  @OneToMany(() => WebsiteEntity, website => website.websiteName)
  websites: WebsiteEntity[];
  
}
