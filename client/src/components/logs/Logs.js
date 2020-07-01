import React, { useEffect } from 'react';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
//Connect React to redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLogs } from '../../actions/logActions';

const Logs = ({ log: { logs, loading, searched }, getLogs }) => {
  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, [getLogs]);

  if (loading || logs === null) {
    return <Preloader />;
  }
  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h4 className='center'>System Logs</h4>
      </li>

      {!loading && logs.length === 0 ? (
        <p className='center'>No logs to show</p>
      ) : searched === null ? (
        logs.map((log) => <LogItem log={log} key={log.id} />)
      ) : (
        searched.map((log) => <LogItem log={log} key={log.id} />)
      )}
    </ul>
  );
};
Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  log: state.log,
});
export default connect(mapStateToProps, { getLogs })(Logs);
