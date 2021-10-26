import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import RecordItem from './RecordItem';
import FormCheckbox from './FormCheckbox';
import {
  addRecord,
  fetchRecords,
  removeRecord,
} from '../features/recordsSlice';

const RecordList: React.FC = () => {
  const { records } = useAppSelector((rootState: RootState) => rootState);
  const dispatch = useAppDispatch();

  const [selectedRecord, setSelectedRecord] = useState<Array<string>>([]);
  const [isShowMoreMenu, setIsShowMoreMenu] = useState<boolean>(false);
  const [newRecord, setNewRecord] = useState<string>('');

  const onMoreClick = () => {
    setIsShowMoreMenu(true);
  };

  const onSelectedAll = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedRecord(
      e.target.checked ? records.map((record) => record.id) : []
    );
  };

  const onSelectedRecord = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    setSelectedRecord((beforeSelectedRecord) =>
      e.target.checked
        ? [...beforeSelectedRecord, id]
        : beforeSelectedRecord.filter((recordId) => recordId !== id)
    );
  };

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(addRecord({ name: newRecord }));
    setNewRecord('');
  };

  const onDeleteRecord = async () => {
    for (const recordId of selectedRecord) {
      await dispatch(removeRecord({ id: recordId }));
    }
    setSelectedRecord([]);
    setIsShowMoreMenu(false);
  };

  const MoreMenu = (): JSX.Element | null => {
    if (!isShowMoreMenu) return null;
    return (
      <>
        <div
          onClick={() => setIsShowMoreMenu(false)}
          className="fixed top-0 left-0 right-0 bottom-0 z-10"
        />
        <div className="bg-gray-200 shadow rounded absolute right-0 top-6 text-left z-20 min-w-[6rem] min-h-[2rem]">
          <ul>
            {!!selectedRecord.length && (
              <li className="w-24">
                <button onClick={onDeleteRecord} className="text-black p-2">
                  Delete
                </button>
              </li>
            )}
          </ul>
        </div>
      </>
    );
  };

  useEffect(() => {
    dispatch(fetchRecords());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="bg-gray-500 p-2 flex justify-between relative">
        <h3 className="text-gray-100">Records</h3>
        <button onClick={onMoreClick} className="text-gray-100">
          <i className="gg-more-vertical-alt" />
        </button>
        <MoreMenu />
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="w-2/12 py-4">
              <FormCheckbox
                isChecked={selectedRecord.length === records.length}
                onChange={onSelectedAll}
              />
            </th>
            <th className="w-4/12 text-left">Name</th>
            <th className="w-2/12 text-left">Status</th>
            <th className="text-left">Applied by</th>
          </tr>
          <tr>
            <th className="border-black border p-2" colSpan={4}>
              <form onSubmit={onFormSubmit} className="ml-20">
                <div className="flex items-center space-x-4">
                  <button type="submit">
                    <i className="gg-math-plus text-gray-400 " />
                  </button>
                  <input
                    onChange={(e) => setNewRecord(e.target.value)}
                    className="w-full outline-none"
                    type="text"
                    placeholder="Create a new record"
                    value={newRecord}
                  />
                </div>
              </form>
            </th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <RecordItem
              key={record.id}
              name={record.name}
              appliedBy={record.appliedBy}
              status={record.status}
              isSelected={
                selectedRecord.findIndex(
                  (recordId) => recordId === record.id
                ) !== -1
              }
              onSelected={(e) => onSelectedRecord(e, record.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordList;
