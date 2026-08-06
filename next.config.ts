import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/go/store',
        destination: 'https://homedecorlightstore.com?sca_ref=12010970.ffFdRrrTKeRin',
        permanent: false,
      },
      {
        source: '/go/chandeliers',
        destination: 'https://homedecorlightstore.com/collections/chandeliers?sca_ref=12010970.ffFdRrrTKeRin',
        permanent: false,
      },
      {
        source: '/go/pendant',
        destination: 'https://homedecorlightstore.com/collections/pendant-lights?sca_ref=12010970.ffFdRrrTKeRin',
        permanent: false,
      },
      {
        source: '/go/sconces',
        destination: 'https://homedecorlightstore.com/collections/wall-sconces?sca_ref=12010970.ffFdRrrTKeRin',
        permanent: false,
      },
      {
        source: '/go/table',
        destination: 'https://homedecorlightstore.com/collections/table-lamps?sca_ref=12010970.ffFdRrrTKeRin',
        permanent: false,
      },
      {
        source: '/go/flush',
        destination: 'https://homedecorlightstore.com/collections/ceiling-lights?sca_ref=12010970.ffFdRrrTKeRin',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
