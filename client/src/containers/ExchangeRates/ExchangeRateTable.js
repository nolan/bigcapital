import React, { useCallback, useMemo, useState } from 'react';
import {
  Button,
  Popover,
  Menu,
  MenuItem,
  Position,
  Intent,
} from '@blueprintjs/core';
import { FormattedMessage as T, useIntl } from 'react-intl';
import moment from 'moment';

import { DataTable, Icon, MoneyExchangeRate } from 'components';
import LoadingIndicator from 'components/LoadingIndicator';

import withDialogActions from 'containers/Dialog/withDialogActions';
import withExchangeRatesActions from 'containers/ExchangeRates/withExchangeRatesActions';
import withExchangeRates from 'containers/ExchangeRates/withExchangeRates';

import { compose } from 'utils';

function ExchangeRateTable({
  // #withExchangeRates
  exchangeRatesList,
  exchangeRatesLoading,
  exchangeRatesPageination,
  // #withDialogActions.
  openDialog,

  // own properties
  loading,
  onFetchData,
  onDeleteExchangeRate,
  onSelectedRowsChange,
}) {
  const [initialMount, setInitialMount] = useState(false);
  const { formatMessage } = useIntl();

  const handelEditExchangeRate = useCallback(
    (exchange_rate) => () => {
      openDialog('exchangeRate-form', { action: 'edit', id: exchange_rate.id });
    },
    [openDialog],
  );

  const handleDeleteExchangeRate = (exchange_rate) => () => {
    onDeleteExchangeRate(exchange_rate);
  };

  const actionMenuList = useCallback(
    (ExchangeRate) => (
      <Menu>
        <MenuItem
          icon={<Icon icon="pen-18" />}
          text={formatMessage({ id: 'edit_exchange_rate' })}
          onClick={handelEditExchangeRate(ExchangeRate)}
        />
        <MenuItem
          text={formatMessage({ id: 'delete_exchange_rate' })}
          intent={Intent.DANGER}
          onClick={handleDeleteExchangeRate(ExchangeRate)}
          icon={<Icon icon="trash-16" iconSize={16} />}
        />
      </Menu>
    ),
    [handelEditExchangeRate, handleDeleteExchangeRate, formatMessage],
  );

  const rowContextMenu = (cell) => {
    return actionMenuList(cell.row.original);
  };

  const columns = useMemo(
    () => [
      {
        id: 'date',
        Header: formatMessage({ id: 'date' }),
        accessor: (r) => moment(r.date).format('YYYY MMM DD'),
        width: 150,
      },
      {
        id: 'currency_code',
        Header: formatMessage({ id: 'currency_code' }),
        accessor: 'currency_code',
        className: 'currency_code',
        width: 150,
      },
      {
        id: 'exchange_rate',
        Header: formatMessage({ id: 'exchange_rate' }),
        accessor: (r) => (
          <MoneyExchangeRate
            amount={r.exchange_rate}
            currency={r.currency_code}
          />
        ),
        className: 'exchange_rate',
        width: 150,
      },
      {
        id: 'actions',
        Header: '',
        Cell: ({ cell }) => (
          <Popover
            content={actionMenuList(cell.row.original)}
            position={Position.RIGHT_TOP}
          >
            <Button icon={<Icon icon="more-h-16" iconSize={16} />} />
          </Popover>
        ),
        className: 'actions',
        width: 50,
      },
    ],
    [actionMenuList, formatMessage],
  );

  const selectionColumn = useMemo(
    () => ({
      minWidth: 42,
      width: 42,
      maxWidth: 42,
    }),
    [],
  );

  const handelFetchData = useCallback(
    (...params) => {
      onFetchData && onFetchData(...params);
    },
    [onFetchData],
  );

  const handelSelectedRowsChange = useCallback(
    (selectRows) => {
      onSelectedRowsChange &&
        onSelectedRowsChange(selectRows.map((c) => c.original));
    },
    [onSelectedRowsChange],
  );

  return (
    <LoadingIndicator loading={loading} mount={false}>
      <DataTable
        columns={columns}
        data={exchangeRatesList}
        onFetchData={handelFetchData}
        loading={exchangeRatesLoading && !initialMount}
        manualSortBy={true}
        selectionColumn={selectionColumn}
        expandable={true}
        treeGraph={true}
        onSelectedRowsChange={handelSelectedRowsChange}
        rowContextMenu={rowContextMenu}
        pagination={true}
        pagesCount={exchangeRatesPageination.pagesCount}
        initialPageSize={exchangeRatesPageination.pageSize}
        initialPageIndex={exchangeRatesPageination.page - 1}
      />
    </LoadingIndicator>
  );
}

export default compose(
  withDialogActions,
  withExchangeRatesActions,
  withExchangeRates(
    ({
      exchangeRatesList,
      exchangeRatesLoading,
      exchangeRatesPageination,
    }) => ({
      exchangeRatesList,
      exchangeRatesLoading,
      exchangeRatesPageination,
    }),
  ),
)(ExchangeRateTable);
