import { Repository, EntityRepository } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.entity';

@EntityRepository(UserEntity)
export class UserEntityRepository extends Repository<UserEntity> {
  // Repository methods and custom queries
}