import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RedisService } from '../../common/libs/redis/redis.service'
import { DataSource } from 'typeorm'
import { RouteDto } from './dto/route.dto'
import { getRedisKey } from 'src/common/utils/utils'
import { RedisKeyPrefix } from 'src/common/enums/redis-key-prefix.enum'
import ms from 'ms'
import { UserEntity } from '../user/user.entity'
import { ResultData } from 'src/common/utils/result'

@Injectable()
export class PermService {
  constructor(
    private readonly redisService: RedisService,
    private readonly config: ConfigService,
    private dataSource: DataSource,
  ) {
    this.REDIS_PREFIX = config.get<string>('redis.keyPrefix') || ''
  }

  private REDIS_PREFIX = ''

  // redis scan 遍历数，根据用户量调整设置，
  private TRAVERSE_MAX_VALUE = 1000

  /**
   * 查询个人 拥有的 api 权限
   * 超管用户不用在这里处理，在 role.guard 守卫中判断是超管 直接 return true
   * 查询生成语句
    SELECT
      `mp`.`api_url`,
      `mp`.`api_method`
    FROM
      `sys_user_role` `ur`
      LEFT JOIN `sys_role_menu` `rm` ON `ur`.`role_id` = `rm`.`role_id`
      LEFT JOIN `sys_menu_perm` `mp` ON `rm`.`menu_id` = `mp`.`menu_id`
    WHERE
      `ur`.`user_id` = ?
      AND `mp`.`menu_id` != 1
    GROUP BY
      `mp`.`api_url`,
      `mp`.`api_method`
      -- 去除 null, 关于 mysql null 是 没有值，当 != 的时候 null 属于没有值而被过滤掉
      =- group by 去重，多个角色绑定一个接口查询重复，所以使用 group by 去掉重复的接口
   * @param userId
   * @returns
   */
      async findUserPerms(userId: string): Promise<RouteDto[]> {
        // mp.menu_id != 1 去掉 有些角色可能没有菜单， 查询的时候 为 null, 不能直接 ！null
        const redisKey = getRedisKey(RedisKeyPrefix.USER_PERM, userId)
        const result = await this.redisService.get(redisKey)
        if (result) return JSON.parse(result)
        const permsResult = await this.dataSource
          .createQueryBuilder()
          .select(['mp.api_url', 'mp.api_method'])
          .from('sys_user_role', 'ur')
          .leftJoin('sys_role_menu', 'rm', 'ur.role_id = rm.role_id')
          .leftJoin('sys_menu_perm', 'mp', 'rm.menu_id = mp.menu_id')
          .where('ur.user_id = :userId and mp.menu_id != 1', { userId })
          .groupBy('mp.api_url')
          .addGroupBy('mp.api_method')
          .getRawMany()
        const perms = permsResult.map((v) => ({ path: v.api_url, method: v.api_method }))
        await this.redisService.set(redisKey, JSON.stringify(perms), ms(this.config.get<string>('jwt.expiresin')) / 1000)
        return perms
      }

  /**
   * 遍历所有 符合的 key
   *
   * @returns
   */
  private async traversePermKeys(match?: string) {
    // const [cursor, elements] = await this.redisService.getClient().scan(0, 'MATCH', 'nest:user:[menu|role]*')
    const keys: string[] = []
    let _cursor = ''
    while (_cursor != '0') {
      const [cursor, elements] = await this.redisService
        .getClient()
        .scan(_cursor || '0', 'MATCH', match || 'nest:user:[menu|role|perm]*', 'COUNT', this.TRAVERSE_MAX_VALUE)
      const _elements = !this.REDIS_PREFIX ? elements : elements.map((ele) => ele.replace(this.REDIS_PREFIX, ''))
      keys.push(..._elements)
      _cursor = cursor
    }
    return keys
  }

  /**
   * 当有权限更新时， 调用该方法，清除所有用户缓存
   * 如： 角色删除，角色编辑等，菜单删除，菜单编辑等
   *
   */
  async clearUserInfoCache(match?: string) {
    try {
      // redis scan 查询出所有 user key
      const keys = await this.traversePermKeys(match)
      // redis scan 可能返回 重复的 key,  不太清楚 ioredis scan 是否去重，在这里 加上去重 保险
      await this.redisService.getClient().unlink([...new Set(keys)])
    } catch (error) {
      return
    }
  }

  findList(dto, user: UserEntity) {
    return ResultData.ok()
  }

  create(dto, user: UserEntity) {
    return ResultData.ok()
  }
  update(dto, user: UserEntity) {
    return ResultData.ok()
  }
  delete(dto, user: UserEntity) {
    return ResultData.ok()
  }
}
