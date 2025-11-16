import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('계산기')
@Controller('calculator')
export class CalculatorController {
  @Get()
  @ApiOperation({
    summary: '계산하기',
    description: '두 숫자와 연산자를 받아 계산 결과를 반환합니다',
  })
  @ApiQuery({
    name: 'a',
    type: Number,
    description: '첫 번째 숫자',
    required: true,
    schema: {
      type: 'number',
      default: 10,
    },
  })
  @ApiQuery({
    name: 'b',
    type: Number,
    description: '두 번째 숫자',
    required: true,
    schema: {
      type: 'number',
      default: 5,
    },
  })
  @ApiQuery({
    name: 'operator',
    type: String,
    description: '연산자 (+, -, *, /)',
    required: true,
    schema: {
      type: 'string',
      enum: ['+', '-', '*', '/'],
      default: '+',
    },
  })
  @ApiResponse({
    status: 200,
    description: '계산 성공',
    schema: { example: { result: 15, expression: '10 + 5 = 15' } },
  })
  @ApiResponse({ status: 400, description: '잘못된 입력' })
  calculate(
    @Query('a') a: string,
    @Query('b') b: string,
    @Query('operator') operator: string,
  ) {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (isNaN(numA) || isNaN(numB)) {
      throw new BadRequestException('유효한 숫자를 입력해주세요');
    }

    let result: number;
    switch (operator) {
      case '+':
        result = numA + numB;
        break;
      case '-':
        result = numA - numB;
        break;
      case '*':
        result = numA * numB;
        break;
      case '/':
        if (numB === 0) {
          throw new BadRequestException('0으로 나눌 수 없습니다');
        }
        result = numA / numB;
        break;
      default:
        throw new BadRequestException('지원하지 않는 연산자입니다');
    }

    return {
      result,
      expression: `${numA} ${operator} ${numB} = ${result}`,
    };
  }

  @Get('add')
  @ApiOperation({
    summary: '덧셈',
    description: '두 숫자를 더합니다',
  })
  @ApiQuery({
    name: 'a',
    type: Number,
    description: '첫 번째 숫자',
    required: true,
    schema: {
      type: 'number',
      default: 10,
    },
  })
  @ApiQuery({
    name: 'b',
    type: Number,
    description: '두 번째 숫자',
    required: true,
    schema: {
      type: 'number',
      default: 5,
    },
  })
  @ApiResponse({
    status: 200,
    description: '계산 성공',
    schema: { example: { result: 15 } },
  })
  add(@Query('a') a: string, @Query('b') b: string) {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (isNaN(numA) || isNaN(numB)) {
      throw new BadRequestException('유효한 숫자를 입력해주세요');
    }
    return {
      result: numA + numB,
      expression: `${numA} + ${numB} = ${numA + numB}`,
    };
  }

  @Get('multiply')
  @ApiOperation({
    summary: '곱셈',
    description: '두 숫자를 곱합니다',
  })
  @ApiQuery({
    name: 'a',
    type: Number,
    description: '첫 번째 숫자',
    required: true,
    schema: {
      type: 'number',
      default: 10,
    },
  })
  @ApiQuery({
    name: 'b',
    type: Number,
    description: '두 번째 숫자',
    required: true,
    schema: {
      type: 'number',
      default: 5,
    },
  })
  @ApiResponse({
    status: 200,
    description: '계산 성공',
    schema: { example: { result: 50 } },
  })
  multiply(@Query('a') a: string, @Query('b') b: string) {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (isNaN(numA) || isNaN(numB)) {
      throw new BadRequestException('유효한 숫자를 입력해주세요');
    }
    return {
      result: numA * numB,
      expression: `${numA} × ${numB} = ${numA * numB}`,
    };
  }
}
