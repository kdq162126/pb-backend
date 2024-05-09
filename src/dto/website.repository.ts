import { Repository, EntityRepository } from 'typeorm';
import { WebsiteEntity } from 'src/database/entities/website.entity';

@EntityRepository(WebsiteEntity)
export class WebsiteEntityRepository extends Repository<WebsiteEntity> {
  // Repository methods and custom queries
  async findMintByWebsiteName(websiteName: string): Promise<WebsiteEntity | undefined>{
    const query = `
      SELECT website_mint FROM websites
      WHERE website_name = $1
      LIMIT 1
    `;
    const parameters = [websiteName];
    
    const result = await this.query(query, parameters);
    return result[0];
  }
}