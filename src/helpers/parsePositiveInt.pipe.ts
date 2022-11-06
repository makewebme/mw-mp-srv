import {
  ArgumentMetadata, BadRequestException, Injectable, ParseIntPipe, ParseIntPipeOptions
} from '@nestjs/common'


@Injectable()
export class ParsePositiveIntPipe extends ParseIntPipe {
  constructor(options?: ParseIntPipeOptions) {
    super(options)
  }

  async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
    const intValue = await super.transform(value, metadata)

    if (intValue <= 0) {
      throw new BadRequestException('Validation failed (positive number is expected)')
    }

    return intValue
  }
}
