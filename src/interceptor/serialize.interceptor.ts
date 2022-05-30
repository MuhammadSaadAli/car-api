import { UseInterceptors, NestInterceptor, CallHandler, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";


// For type safety, we are going to make an interface to verify that the argument must be of class

interface classConstructor{
    new (...args: any[]): {}
}
export function Serialize(dto: classConstructor): any{
    return UseInterceptors(new SerializeInterceptor(dto))
}
export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any){}
    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
       
        return handler.handle().pipe(
            map(data => plainToClass(this.dto, data, {
                excludeExtraneousValues: true,
            }))
        )
    }
}