import { Injectable } from '@nestjs/common';
import { IPaginateResponse } from 'src/common/interfaces/index.interface';
import { IInAppNotification } from 'src/databases/interaces/in-app-notification.interface';
import { PaginateService } from 'src/infrastructures/services/paginate.service';
import { InAppNotificationPaginateV1RequestDto } from '../dto/v1/index/in-app-notification-paginate-v1.request';
import { InAppRepository } from '../repositories/in-app-notification.repository';

@Injectable()
export class InAppService extends PaginateService {
    constructor(private readonly inAppRepository: InAppRepository) {
        super();
    }

    async fetchPaginate(
        user: any,
        pagination: InAppNotificationPaginateV1RequestDto,
    ): Promise<IPaginateResponse<IInAppNotification>> {
        const targetName =
            this.inAppRepository.inAppRepository.metadata.targetName;

        const query = this.inAppRepository.inAppRepository
            .createQueryBuilder(targetName)
            .where(`${targetName}.targetUserId = :targetUserId`, {
                targetUserId: user.id,
            });

        if (pagination.keyword) {
            query.andWhere((qb) => {
                qb.where(`${targetName}.title ILIKE :keyword`, {
                    keyword: `%${pagination.keyword}%`,
                }).orWhere(`${targetName}.message ILIKE :keyword`, {
                    keyword: `%${pagination.keyword}%`,
                });
            });
        }

        if (pagination.sort) {
            switch (pagination.sort) {
                case 'title':
                    query.orderBy(
                        `${targetName}.title`,
                        this.getOrder(pagination.order),
                    );
                    break;
                case 'isRead':
                    query.orderBy(
                        `${targetName}.isRead`,
                        this.getOrder(pagination.order),
                    );
                    break;
                case 'message':
                    query.orderBy(
                        `${targetName}.message`,
                        this.getOrder(pagination.order),
                    );
                    break;
                default:
                    query.orderBy(
                        `${targetName}.createdAt`,
                        this.getOrder(pagination.order),
                    );
                    break;
            }
        }

        query.take(pagination.perPage ?? this.DefaultPerPage);
        query.skip(this.countOffset(pagination));

        const [data, count] = await query.getManyAndCount();

        const meta = this.mapMeta(count, pagination);

        return {
            data,
            meta,
        };
    }

    async findOneById(id: string): Promise<IInAppNotification> {
        return this.inAppRepository.inAppRepository.findOneOrFail({
            where: {
                id,
            },
        });
    }
}
