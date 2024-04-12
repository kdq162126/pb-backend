import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  email: string;
}
