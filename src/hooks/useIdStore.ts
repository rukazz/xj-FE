import { Reducer, useCallback, useMemo, useReducer } from 'react';
import { uniq } from 'lodash';

type IProps = [string[], IIdsStore];
interface IIdsStore {
  add: (ids: string[] | string) => void;
  remove: (ids: string[] | string) => void;
  reset: (ids: string[] | string) => void;
  clear: () => void;
}

export const useIdStore: () => IProps = () => {
  const reducer: Reducer<
    string[],
    { mode: 'add' | 'delete' | 'reset' | 'clear'; changeIds?: string[] }
  > = (prev, { mode, changeIds = [] }) => {
    let currentIds: string[] = prev;
    switch (mode) {
      case 'add':
        currentIds = uniq([...prev, ...changeIds]);
        break;
      case 'delete':
        currentIds = prev.filter((id) => !changeIds.includes(id));
        break;
      case 'clear':
        currentIds = [];
        break;
      case 'reset':
        currentIds = changeIds;
        break;
    }
    return currentIds;
  };

  const [ids, setIds] = useReducer(reducer, []);

  const add = useCallback(
    (ids: string[] | string) =>
      setIds({ mode: 'add', changeIds: Array.isArray(ids) ? ids : [ids] }),
    [],
  );

  const remove = useCallback(
    (ids: string[] | string) =>
      setIds({ mode: 'delete', changeIds: Array.isArray(ids) ? ids : [ids] }),
    [],
  );

  const reset = useCallback(
    (ids: string[] | string) =>
      setIds({ mode: 'reset', changeIds: Array.isArray(ids) ? ids : [ids] }),
    [],
  );

  const clear = useCallback(() => setIds({ mode: 'clear' }), []);

  const action = useMemo(() => {
    return {
      add,
      remove,
      reset,
      clear,
    };
  }, []);

  return [ids, action];
};
