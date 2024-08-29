import { Transform, TransformFnParams } from 'class-transformer';

export function Lowercase(): PropertyDecorator {
	return Transform(({ value }: TransformFnParams) => {
		const _value: string = value;
		return _value.toLowerCase();
	});
}
