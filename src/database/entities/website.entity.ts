import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { EnterpriseEntity } from './enterprise.entity';

@Entity({ name: 'websites' })
export class WebsiteEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  websiteName: string;

  @Column()
  websiteMint: string;
  
  @ManyToOne(() => EnterpriseEntity, enterprise => enterprise.websites)
  enterprise: EnterpriseEntity;
}
