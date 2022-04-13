declare module "investing-com-api" {
  export function investing(
    input: string,
    period?: 'P1D' | 'P1W' | 'P1M' | 'P3M' | 'P6M' | 'P1Y' | 'P5Y' | 'MAX',
    interval?: 'PT1M' | 'PT5M' | 'PT15M' | 'PT30M' | 'PT1H' | 'PT5H' | 'P1D' | 'P1W' | 'P1M',
    pointscount?: 60 | 70 | 120
  ): { date: number, value: number }[];
}
