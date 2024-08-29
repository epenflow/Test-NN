import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from 'src/account/entities/account.entity';

@Controller('account')
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@Post()
	async create(@Body() createAccountDto: CreateAccountDto) {
		return await this.accountService.create(createAccountDto);
	}

	@Get()
	async findAll(): Promise<Account[]> {
		return this.accountService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.accountService.findOne(+id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateAccountDto: UpdateAccountDto,
	) {
		return this.accountService.update(+id, updateAccountDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.accountService.remove(+id);
	}
}
