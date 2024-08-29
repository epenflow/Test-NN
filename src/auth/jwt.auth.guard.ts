import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

export class JWTAuthGuard extends AuthGuard('jwt') {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		return super.canActivate(context);
	}
	handleRequest<TUser = any>(
		err: any,
		user: any,
		info: any,
		context: ExecutionContext,
		status?: any,
	): TUser {
		console.log({
			info,
			context,
			status,
		});
		if (err || !user) {
			throw err || new UnauthorizedException();
		}
		return user;
	}
}
