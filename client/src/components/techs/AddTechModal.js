import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import { addTech } from '../../actions/techActions';
import PropTypes from 'prop-types';

const AddTechModal = ({ addTech }) => {
  const [firstName, setFirstName] = useState(' ');
  const [lastName, setLastName] = useState(' ');
  const tech = {
    firstName,
    lastName,
  };

  const onSubmit = () => {
    if (firstName === '' || lastName === '') {
      M.toast({ html: 'Please Enter Name' });
    } else {
      addTech(tech);
      M.toast({ html: 'Technician Added' });
      //Clear Fields
      setFirstName('');
      setLastName('');
    }
  };

  return (
    <div id='add-tech-modal' className='modal'>
      <div className='modal-content'>
        <h4 className='purple-text text-darken-4'>New Technician</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='firstName'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor='firstName' className='active'>
              First Name
            </label>
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor='lastName' className='active'>
              Last Name
            </label>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect purple waves-purple btn darken-4'
        >
          Enter
        </a>
      </div>
    </div>
  );
};
AddTechModal.propTypes = {
  addTech: PropTypes.func.isRequired,
};

export default connect(null, { addTech })(AddTechModal);
