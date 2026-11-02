import React from 'react';
import { MarketingHeader } from './MarketingHeader';
import {
  SENTINEL_BRAND_LOGO_BASE64,
  SENTINEL_SHIELD_FAVICON_BASE64,
  SENTINEL_BRAND_SHIELD_BASE64,
  getSentinelBrandLogo,
  getSentinelFavicon,
} from '../constants/assets';

// 🛡️ Global High-Resolution Enterprise Visual Assets Ledger
export {
  SENTINEL_BRAND_LOGO_BASE64,
  SENTINEL_SHIELD_FAVICON_BASE64,
  SENTINEL_BRAND_SHIELD_BASE64,
  getSentinelBrandLogo,
  getSentinelFavicon,
};

export const Navbar: React.FC = () => {
  return <MarketingHeader />;
};

export default Navbar;
