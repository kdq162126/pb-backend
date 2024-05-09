import { Repository, EntityRepository } from 'typeorm';
import { EnterpriseEntity } from 'src/database/entities/enterprise.entity';

@EntityRepository(EnterpriseEntity)
export class EnterpriseEntityRepository extends Repository<EnterpriseEntity> {
  // Repository methods and custom queries
  async findByWebsiteName(websiteName: string): Promise<EnterpriseEntity | undefined>{

    const query = `
      SELECT * FROM enterprises e
      JOIN websites w ON w.enterprise_id = e.id
      WHERE w.website_name = $1
      LIMIT 1
    `;
    const parameters = [websiteName];
    
    const result = await this.query(query, parameters);
    return result[0];
  }
}