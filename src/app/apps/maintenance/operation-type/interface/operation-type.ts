export interface OperationType {
  id: string;
  type: string;
  cost: string;
  isActive: boolean;
  isDeleted: boolean;
}

export const basicOperation = [
    'addition',
    'subtraction',
    'multiplication',
    'division'
]

export enum BasicOperationType {
  addition = 'addition',
  subtraction = 'subtraction',
  multiplication = 'multiplication',
  division =  'division'
}

export enum OperationSymbol {
  addition = '+',
  subtraction = '-',
  multiplication = '*',
  division =  '/',
  square_root  =  '**',
  random_string =  'str'
}