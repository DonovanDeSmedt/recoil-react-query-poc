import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { search } from './search-actions';
import { Todos } from 'modules/todos/Todos';

const mapDispatchToProps = { search };

export default connect(
  null,
  mapDispatchToProps,
)(Todos);
