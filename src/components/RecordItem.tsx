import React, { ChangeEvent } from 'react';
import { IRecord } from '../types/Record';
import { RecordStatus } from '../types/RecordStatus';
import Tag from './Tag';
import FormCheckbox from './FormCheckbox';

type Props = Pick<IRecord, 'name' | 'status' | 'appliedBy'> & {
  isSelected: boolean;
  onSelected: (e: ChangeEvent<HTMLInputElement>) => void;
};

const RecordItem: React.FC<Props> = ({
  name,
  status,
  appliedBy,
  isSelected,
  onSelected,
}) => {
  return (
    <tr>
      <td>
        <FormCheckbox isChecked={isSelected} onChange={onSelected} />
      </td>
      <td>{name}</td>
      <td>{RecordStatus[status]}</td>
      <td className="space-x-2">
        {appliedBy.map((name) => (
          <Tag key={name} text={name} />
        ))}
      </td>
    </tr>
  );
};

export default RecordItem;
