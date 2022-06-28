// TODO: add stats

import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../store/selectors';

interface DataItemProps {
  data: string | number,
  name: string,
}

function DataItem({ data, name }: DataItemProps) {
  if(typeof data === 'object') {
    return (
      <>
        {Object.entries(data).map(([key, value]) => {
          console.log(value)
          return (
            <div key={key} className="data__item">
              <span className="data__header">{key}</span>
              {`: ${value}`}
            </div>
          )
        })}
      </>
    )
  }
  return (
    <div className="data__item">
      <span className="data__header">{name}</span>
      {': '}
      {data}
    </div>
  );
}

const userProperties = {
  username: 'Name',
  level: 'Level',
  exp: 'Experience',
  stats: 'Stats',
};

function ProfilePage() {
  const { user } = useSelector(userSelector);
  return (
    <div className="profile bg-main">
      <div className="profile__img" />
      <div className="profile__data">
        {Object.keys(user).map((key) => (
          <DataItem
            key={key}
            data={user[key]}
            name={key}
          />
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
