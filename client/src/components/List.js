import PropTypes from 'prop-types';
import { AutoSizer, List as RVList } from 'react-virtualized';
import styles from './List.module.scss';

export default function List({ height, rowHeight, items = [], renderItem }) {
  const noRowsRenderer = () => (
    <div className={styles.noRows}>No rows</div>
  );

  const rowRenderer = ({ index, key, style }) => (
    <div key={key} style={style} className={styles.row}>
      {renderItem(items[index])}
    </div>
  );

  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <RVList
          width={width}
          height={height}
          overscanRowCount={5}
          noRowsRenderer={noRowsRenderer}
          rowCount={items.length}
          rowHeight={rowHeight}
          rowRenderer={rowRenderer}
          className={styles.List}
        />
      )}
    </AutoSizer>
  );
}

List.propTypes = {
  height: PropTypes.number,
  rowHeight: PropTypes.number,
  items: PropTypes.array,
  renderItem: PropTypes.func,
};

List.defaultProps = {
  height: 800,
  rowHeight: 100,
  items: [],
  renderItem: (item) => 'Item', 
};
