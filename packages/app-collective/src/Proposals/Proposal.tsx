// Copyright 2017-2019 @polkadot/app-democracy authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { I18nProps } from '@polkadot/ui-app/types';
import { Option, Proposal as ProposalType, Votes } from '@polkadot/types';

import BN from 'bn.js';
import React from 'react';
import styled from 'styled-components';
import { ActionItem, InputAddress, Labelled, Voting } from '@polkadot/ui-app';
import { withCalls, withMulti } from '@polkadot/ui-api';

import translate from '../translate';

interface Props extends I18nProps {
  chain_bestNumber?: BN;
  hash: string;
  proposal: ProposalType | null;
  votes: Votes | null;
}

interface State {
  votedTotal: number;
  votedNay: number;
  votedAye: number;
}

class Proposal extends React.PureComponent<Props, State> {
  public state: State = {
    votedTotal: 0,
    votedAye: 0,
    votedNay: 0
  };

  public static getDerivedStateFromProps ({ votes }: Props): State | null {
    if (!votes) {
      return null;
    }

    const { ayes, nays } = votes;

    const newState: State = {
      votedNay: nays.length,
      votedAye: ayes.length,
      votedTotal: ayes.length + nays.length
    };

    return newState;
  }

  public render (): React.ReactNode {
    const { className, hash, proposal, votes } = this.props;

    if (!proposal || !votes) {
      return null;
    }

    const { index } = votes;

    return (
      <ActionItem
        className={className}
        accessory={
          <Voting
            hash={hash}
            isCollective
            idNumber={index}
            proposal={proposal}
          />
        }
        expandNested
        idNumber={index}
        proposal={proposal}
      >
        {this.renderInfo()}
      </ActionItem>
    );
  }

  private renderInfo (): React.ReactNode {
    const { votes, t } = this.props;

    if (!votes) {
      return null;
    }

    const { ayes, nays, threshold } = votes;

    return (
      <div>
        <h4>
          {t(
            'ayes ({{ayes}}/{{threshold}} to approve)',
            {
              replace: {
                ayes: ayes.length,
                threshold: threshold.toString()
              }
            }
          )}
        </h4>
        {ayes.map((address, index): React.ReactNode => (
          <Labelled
            key={`${index}:${address}`}
            label={t('Aye')}
          >
            <InputAddress
              isDisabled
              value={address}
              withLabel={false}
            />
          </Labelled>
        ))}
        <h4>
          {t(
            'nays ({{nays}})',
            {
              replace: {
                nays: nays.length
              }
            }
          )}
        </h4>
        {nays.map((address, index): React.ReactNode => (
          <Labelled
            key={`${index}:${address}`}
            label={t('Nay')}
          >
            <InputAddress
              isDisabled
              value={address}
              withLabel={false}
            />
          </Labelled>
        ))}
      </div>
    );
  }
}

export default withMulti(
  styled(Proposal as React.ComponentClass<Props>)`
    .democracy--Proposal-results {
      margin-bottom: 1em;

      &.chart {
        text-align: center;
      }
    }
  `,
  translate,
  withCalls<Props>(
    [
      'query.collective.proposalOf',
      {
        paramName: 'hash',
        propName: 'proposal',
        transform: (value: Option<ProposalType>): ProposalType | null =>
          value.unwrapOr(null)
      }
    ],
    [
      'query.collective.voting',
      {
        paramName: 'hash',
        propName: 'votes',
        transform: (value: Option<Votes>): Votes | null =>
          value.unwrapOr(null)
      }
    ]
  )
);
