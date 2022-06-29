import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../store/selectors';

interface ProfileBaseInfo {
  username: string,
  exp: string,
}

interface ProfileStatsInfo {
  agi: number,
  str: number,
  int: number,
}

function ProfilePageInfo(info: ProfileBaseInfo | ProfileStatsInfo) {
    return (
      <>
        {Object.entries(info).map(([key, value]) => {
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

const userProperties = {
  username: 'Name',
  level: 'Level',
  exp: 'Experience',
  stats: 'Stats',
};

function ProfilePage() {
  const { user } = useSelector(userSelector);
  const [currentTab, setCurrentTab] = useState('info');
  return (
    <div className="profile bg-main">
      <div className="profile__img" />
      <div className="profile__info">
        <nav className='profile__info-tabs'>
          <button onClick={() => setCurrentTab('info')} className={`${currentTab == 'info' ? 'active ' : ''}profile__info-tab`}>Info</button>
          <button onClick={() => setCurrentTab('stats')} className={`${currentTab == 'stats' ? 'active ' : ''}profile__info-tab`}>Stats</button>
        </nav>
        <div className='profile__info-view'>
        {currentTab === 'info' ? ProfilePageInfo({ username: user.username, exp: user.exp}) : null}
        {currentTab === 'stats' ? ProfilePageInfo(user.stats) : null}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
