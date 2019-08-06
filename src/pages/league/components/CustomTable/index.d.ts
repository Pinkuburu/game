export interface ColumnProps<T> {
  title?: React.ReactNode;
  key?: React.Key;
  dataIndex?: string;
  render?: (text: any, record: T, index: number) => React.ReactNode;
  align?: 'left' | 'right' | 'center';
  headerAlign?: 'left' | 'right' | 'center';
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
  className?: string;
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

export interface TableEventListeners {
  onClick?: (arg: React.SyntheticEvent) => void;
  onDoubleClick?: (arg: React.SyntheticEvent) => void;
  onContextMenu?: (arg: React.SyntheticEvent) => void;
  onMouseEnter?: (arg: React.SyntheticEvent) => void;
  onMouseLeave?: (arg: React.SyntheticEvent) => void;
  [name: string]: any;
}

export interface TableContentProps<T> {
  dataSource: any[];
  columns: ColumnProps<T>[];
  rowKey: string;
  rowHeight?: number;
  onRowClick?: (record: T, index: number, event: Event) => void;
  onRow?: (record: T, index: number) => TableEventListeners;
}

export interface TableHeaderProps<T> {
  columns: ColumnProps<T>[];
  headerRowHeight?: number;
  className?: string;
  dataSource: any[];
  width?: number;
  minWidth?: number;
  onHeaderRow?: (columns: ColumnProps<T>[]) => TableEventListeners;
}
