import React from 'react';

import ClientStats from '../sidebar/TransferData';
import SearchBox from '../forms/SearchBox';
import SpeedLimitDropdown from '../sidebar/SpeedLimitDropdown';
import StatusFilters from '../sidebar/StatusFilters';

class Sidebar extends React.Component {
  render() {
    return (
      <div className="application__sidebar">
        <SpeedLimitDropdown />
        <ClientStats />
        <SearchBox />
        <StatusFilters />
      </div>
    );
  }
}

export default Sidebar;
