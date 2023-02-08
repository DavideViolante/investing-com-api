declare module "investing-com-api" {
  export function investing(
    input: string,
    period?: 'P1D' | 'P1W' | 'P1M' | 'P3M' | 'P6M' | 'P1Y' | 'P5Y' | 'MAX',
    interval?: 'PT1M' | 'PT5M' | 'PT15M' | 'PT30M' | 'PT1H' | 'PT5H' | 'P1D' | 'P1W' | 'P1M',
    pointscount?: 60 | 70 | 120,
    pptrLaunchOptions?: any,
  ): Promise<{
    date: number,
    value: number,
    price_open: number,
    price_high: number,
    price_low: number,
    price_close: number,
  }[]>;
}
