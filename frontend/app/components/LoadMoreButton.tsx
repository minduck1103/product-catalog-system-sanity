import React from 'react';

type LoadMoreButtonProps = {
  onClick: () => void;
};

const LoadMoreButton = ({ onClick }: LoadMoreButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{ width: 298, height: 50, borderRadius: 6, border: '1px solid #222', background: '#fff', color: '#222', fontWeight: 'bold', fontSize: 16, margin: '32px auto 0', display: 'block', cursor: 'pointer' }}
    >
      Load more products
    </button>
  );
};

export default LoadMoreButton; 