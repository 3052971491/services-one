import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class UpdateInterceptor implements NestInterceptor {
  constructor() {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest()
    const user = request.user // 获取当前用户信息
    const now = new Date() // 获取当前时间

    const generateParams = (method: string) => {
      const params: any = {}

      if (['PUT'].includes(method)) {
        params.updatedBy = user.id
        params.updatedAt = now
      } else if (method === 'POST') {
        params.createdBy = user.id
      } else if (method === 'DELETE') {
        params.deletedBy = user.id
        params.deletedAt = now
      }
      request.params = { ...params, ...request.params }
      request.body = { ...params, ...request.body }
      return params
    }

    const params = generateParams(request.method)

    return next.handle().pipe(
      tap(async () => {
        // 使用 TypeScript 类型推断来避免手动删除敏感信息
        if (request.method === 'POST') {
          delete params['createdBy']
        } else if (request.method === 'PUT') {
          delete params['updatedBy']
        } else if (request.method === 'DELETE') {
          delete params['deletedBy']
        }
      }),
    )
  }
}
