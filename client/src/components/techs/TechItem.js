import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTech } from '../../actions/techActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const TechItem = ({ tech, deleteTech }) => {
  const { firstName, lastName, id } = tech;

  const del = () => {
    deleteTech(id);
    M.toast({ html: 'Tech Deleted' });
  };
  return (
    <li className='collection-item'>
      <div>
        {firstName}
        {lastName}
        <a href='#!' className='secondary-content' onClick={del}>
          <i className='material-icons purple-text'>delete</i>
        </a>
      </div>
    </li>
  );
};

TechItem.propTypes = {
  tech: PropTypes.object.isRequired,
  deleteTech: PropTypes.func.isRequired,
};

export default connect(null, { deleteTech })(TechItem);
