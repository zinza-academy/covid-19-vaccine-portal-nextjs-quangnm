import { InjectRepository } from '@nestjs/typeorm';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminRoleGuard implements CanActivate {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ){}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (user.role_id === 1) { 
            return true;
        } else {
            return false;
        }
    }
}
