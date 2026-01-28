import localFont from 'next/font/local';

export const productSans = localFont({
  src: [
    {
      path: '../../public/fonts/ProductSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ProductSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ProductSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-product-sans',
  display: 'swap',
});
