// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode,
  className?: string
};

class Card extends React.PureComponent<Props> {
  render () {
    const { children, className } = this.props;

    return (
      <article className={`ui--Card ${className}`}>
        {children}
      </article>
    );
  }
}

export default styled(Card)`
  position: relative;

  i.help.circle.icon,
  .ui.button.mini,
  .addTags {
    visibility: hidden;
  }

  &:hover {
    i.help.circle.icon,
    .ui.button.mini,
    .addTags {
      visibility: visible;
    }
  }

  .ui--AddressSummary-buttons {
    text-align: right;
    margin-bottom: 2em;

    button {
      margin-left: 0.2em;
    }
  }
`;
