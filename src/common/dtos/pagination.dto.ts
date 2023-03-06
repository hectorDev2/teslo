import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';


export class PaginationDto {


    @ApiProperty({
        description: 'Limit product to page',
        default: 10,
        minimum: 1
    })
    @IsOptional()
    @IsPositive()
    @Type(() => Number) // enableImplicitConversions: true
    limit?: number;

    @ApiProperty({
        description: 'skip number products',
        default: 0
    })
    @IsOptional()
    @Min(0)
    @Type(() => Number) // enableImplicitConversions: true
    offset?: number;

}