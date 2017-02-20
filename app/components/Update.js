import React from 'react';
import { connect } from 'react-redux';
import { toggleUpdate, saveIfToken } from '../actions/actions';

const lastUpdate = "2017-02-20-1";

class Update extends React.Component {
  render() {
    return (
      <div className="update">
        { this.props.showUpdate &&
          <div className="update-stuff">
            <h3>Update (2/20/2017)</h3>
            <ul>
              <li><b>There's currently a problem with reading save files, most likely due to Valentine's equipment. Expect a fix by the end of today.</b></li>
              <li>HTTPS is now enabled (big thanks to <a href="https://www.reddit.com/user/mokrinsky">/u/mokrinsky</a>!) - if you're even reading this, that means that things worked. If you're not reading this, well... ¯\_(ツ)_/¯</li>
              <li>There have been a couple of bugfixes in the past few days, as always, let me know if you find more</li>
              <li>There have also been a few QOL things - a notification if some of your stuff isn't filled, a bit of color, tweaks to the artifact buying suggestions</li>
            </ul>
          </div>
        }
        <div className="update-toggle" onClick={(e) => this.props.onToggleUpdate(!this.props.showUpdate)}>
          { this.props.showUpdate ? (
            <i className="update-icon fa fa-angle-double-up"></i>
          ) : (
            <i className="update-icon fa fa-angle-double-down"></i>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  var toggle = state.getIn(['ui', 'update'], false);
  var lastDate = state.getIn(['ui', 'lastUpdate'], "");
  return {
    showUpdate: toggle || (lastUpdate > lastDate),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleUpdate: (show) => {
      dispatch(toggleUpdate(show, lastUpdate));
      dispatch(saveIfToken());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Update);