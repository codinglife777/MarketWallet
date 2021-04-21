// Copyright 2017-2021 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ThemeDef } from '@polkadot/react-components/types';

import nf4Digital from '../public/logos/nf4Digital.png';
import UniqueLogo from '../public/logos/unique.svg';

export const uniqueTheme: ThemeDef = {
  domain: 'whitelabel.market',
  logo: UniqueLogo as string,
  theme: 'Unique'
};

export const nf3Theme: ThemeDef = {
  domain: 'nf3digital.com',
  logo: nf4Digital as string,
  theme: 'NF3Digital'
};

export const luvTheme: ThemeDef = {
  ip: '18.206.14.88',
  theme: 'LUVNFT'
};

export const vernissageTheme: ThemeDef = {
  domain: '',
  theme: 'Vernissage'
};

export const Themes: ThemeDef[] = [uniqueTheme, nf3Theme, luvTheme, vernissageTheme];
