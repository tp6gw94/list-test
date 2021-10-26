import React from 'react';
import classNames from 'classnames';

interface Props {
  isChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormCheckbox: React.FC<Props> = ({ onChange, isChecked }) => {
  return (
    <label
      className={classNames(
        'w-4 h-4 border-black border-2 block mx-auto flex items-center justify-center',
        {
          'bg-black': isChecked,
        }
      )}
    >
      <input
        className="hidden"
        type="checkbox"
        value=""
        checked={isChecked}
        onChange={onChange}
      />
      {isChecked && (
        <span>
          <i className="gg-check" />
        </span>
      )}
    </label>
  );
};

export default FormCheckbox;
