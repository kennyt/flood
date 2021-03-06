import React from 'react';

import Action from './Action';
import Add from '../icons/Add';
import EventTypes from '../../constants/EventTypes';
import Pause from '../icons/Pause';
import SortDropdown from './SortDropdown';
import Start from '../icons/Start';
import Stop from '../icons/Stop';
import TorrentActions from '../../actions/TorrentActions';
import TorrentFilterStore from '../../stores/TorrentFilterStore';
import TorrentStore from '../../stores/TorrentStore';
import UIActions from '../../actions/UIActions';

const METHODS_TO_BIND = [
  'handleAddTorrents',
  'handleSortChange',
  'handleStart',
  'handleStop',
  'onSortChange'
];

export default class ActionBar extends React.Component {
  constructor() {
    super();

    this.state = {
      sortBy: TorrentFilterStore.getTorrentsSort()
    };

    METHODS_TO_BIND.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  componentDidMount() {
    TorrentFilterStore.fetchSortProps();
    TorrentFilterStore.listen(EventTypes.UI_TORRENTS_SORT_CHANGE, this.onSortChange);
  }

  componentWillUnmount() {
    TorrentFilterStore.unlisten(EventTypes.UI_TORRENTS_SORT_CHANGE, this.onSortChange);
  }

  handleAddTorrents() {
    UIActions.displayModal('add-torrents');
  }

  handleSortChange(sortBy) {
    UIActions.setTorrentsSort(sortBy);
  }

  handleStart() {
    TorrentActions.startTorrents(TorrentStore.getSelectedTorrents());
  }

  handleStop() {
    TorrentActions.stopTorrents(TorrentStore.getSelectedTorrents());
  }

  onSortChange() {
    this.setState({
      sortBy: TorrentFilterStore.getTorrentsSort()
    });
  }

  render() {
    return (
      <nav className="action-bar">
        <div className="actions action-bar__item action-bar__item--sort-torrents">
          <SortDropdown onSortChange={this.handleSortChange}
            selectedItem={this.state.sortBy} />
        </div>
        <div className="actions action-bar__item action-bar__item--torrent-operations">
          <div className="action-bar__group">
            <Action label="Start Torrent" slug="start-torrent" icon={<Start />}
              clickHandler={this.handleStart} />
            <Action label="Stop Torrent" slug="stop-torrent" icon={<Stop />}
              clickHandler={this.handleStop} />
            <Action label="Pause Torrent" slug="pause-torrent" icon={<Pause />}
              clickHandler={this.handlePause} />
          </div>
          <div className="action-bar__group action-bar__group--has-divider">
            <Action label="Add Torrent" slug="add-torrent" icon={<Add />}
              clickHandler={this.handleAddTorrents} />
          </div>
        </div>
      </nav>
    );
  }

}
