import React from 'react';

const AssetHistoryList = ({ assetId }) => {
  // Call API to get asset history
  const history = [];

  return (
    <ul>
      {history.map((entry) => (
        <li key={entry.id}>
          {entry.date}: {entry.event}
        </li>
      ))}
    </ul>
  );
};

export default AssetHistoryList;