import React, { Component } from 'react';
import SurveyField from './SurveyField';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
  {
    name: 'title',
    label: 'Survey Title'
  },
  {
    name: 'subject',
    label: 'Subject Line'
  },
  {
    name: 'body',
    label: 'Email Body'
  },
  {
    name: 'emails',
    label: 'Recipient List'
  }
];

class SurveyForm extends Component {
  renderFields() {
    return FIELDS.map(({ label, name }) => {
      return (
        <Field
          key={name}
          label={label}
          name={name}
          type="text"
          component={SurveyField}
        />
      );
    });
  }
  render() {
    return (
      <div>
        SurveyForm
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <button type="submit" className={'teal btn-flat right white-text'}>
            Next
            <i className={'material-icons right'}>done</i>
          </button>
          <Link to={'/surveys'} className={'red btn-flat left white-text'}>
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.emails = validateEmails(values.emails || '');

  FIELDS.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a value`;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm'
})(SurveyForm);
