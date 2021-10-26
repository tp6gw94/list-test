import React from 'react';

interface Props {
  text: string;
}

const Tag: React.FC<Props> = ({ text }) => {
  return (
    <span className="bg-gray-200 rounded-2xl px-2 py-1 inline-block min-w-[40px] text-center">
      {text}
    </span>
  );
};

export default Tag;
