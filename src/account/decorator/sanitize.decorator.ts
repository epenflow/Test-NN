import { Transform, TransformFnParams } from 'class-transformer';
import * as sanitizeHTML from 'sanitize-html';
export function Sanitize(): PropertyDecorator {
	return Transform(({ value }: TransformFnParams) => {
		return sanitizeHTML(value);
	});
}
