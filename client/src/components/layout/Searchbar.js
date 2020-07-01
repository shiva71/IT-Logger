import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchLogs, clearSearch } from '../../actions/logActions';

const Searchbar = ({ log: { searched }, searchLogs }) => {
  const text = useRef('');

  useEffect(() => {
    if (searched === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== null) {
      searchLogs(text.current.value);
    } else {
      clearSearch();
    }
  };
  return (
    <nav style={{ marginBottom: '30px' }} className='purple darken-4'>
      <div className='nav-wrapper'>
        <form>
          <div className='input-field'>
            <input
              id='search'
              type='search'
              placeholder='Search Logs..'
              ref={text}
              onChange={onChange}
            />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i className='material-icons'>close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};

Searchbar.propTypes = {
  searchLog: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  log: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  log: state.log,
});

export default connect(mapStateToProps, { searchLogs, clearSearch })(Searchbar);
