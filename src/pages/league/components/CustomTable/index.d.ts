export interface ColoumProps<T> {
  title?: React.ReactNode;
  key?: React.Key;
  dataIndex?: string;
  render?: (text: any, record: T, index: number) => React.ReactNode;
  align?: 'left' | 'right' | 'center';
  // filters?: ColumnFilterItem[];
  // onFilter?: (value: any, record: T) => boolean;
  // filterMultiple?: boolean;
  // filterDropdown?: React.ReactNode | ((props: FilterDropdownProps) => React.ReactNode);
  // filterDropdownVisible?: boolean;
  // onFilterDropdownVisibleChange?: (visible: boolean) => void;
  // sorter?: boolean | CompareFn<T>;
  // defaultSortOrder?: SortOrder;
  // colSpan?: number;
  width?: string | number;
  // className?: string;
  // fixed?: boolean | ('left' | 'right');
  // filterIcon?: React.ReactNode | ((filtered: boolean) => React.ReactNode);
  // filteredValue?: any[];
  // sortOrder?: SortOrder | boolean;
  // children?: ColumnProps<T>[];
  // onCellClick?: (record: T, event: Event) => void;
  // onCell?: (record: T, rowIndex: number) => TableEventListeners;
  // onHeaderCell?: (props: ColumnProps<T>) => TableEventListeners;
  // sortDirections?: SortOrder[];
}
