import { Column, Entity, Index, Unique } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { JsonColumnTransformer } from '../../common/json-column.type';
import { PLATFORM } from '../../utils/const';


@Entity({ name: 'blacklist' })
@Unique(['code', 'platform'])
export class BlacklistEntity extends AbstractEntity {
    @Column()
    name: string;

    @Index()
    @Column()
    code: string;

    @Index()
    @Column({ type: 'enum', enum: PLATFORM })
    platform: PLATFORM;

    @Column({ nullable: true, type: 'text' })
    desc: string;

    @Column({ nullable: true, type: 'json', transformer: new JsonColumnTransformer() })
    meta: Record<string, any>;
}
