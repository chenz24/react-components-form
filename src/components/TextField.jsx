import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldConnect from './FieldConnect';
import ErrorField from './ErrorField';
import classnames from 'classnames';

export class TextField extends Component {
    handleChange({ target: { value } }) {
        const { trim = false, onChange } = this.props;

        onChange(
            trim && value ? value.trim() : value
        );
    }

    render() {
        const {
            wrapperClassName,
            className,
            name,
            type = 'text',
            validationErrors,
            hasValidationError,
            value = '',
            label,
            placeholder,
            errorStyles = {},
            fieldAttributes = {}
        } = this.props;

        return (
            <div className={classnames(wrapperClassName, hasValidationError && errorStyles.fieldClassName)}>
                {label && <label>{label}</label>}
                <input
                    type={type === String ? 'text' : type}
                    name={name}
                    onChange={::this.handleChange}
                    value={value}
                    placeholder={placeholder}
                    className={className}
                    {...fieldAttributes}
                />
                {hasValidationError && <ErrorField errors={validationErrors} {...errorStyles} />}
            </div>
        );
    }
}

TextField.propTypes = {
    wrapperClassName: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    validationErrors: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
        PropTypes.string,
        PropTypes.shape({})
    ]),
    hasValidationError: PropTypes.bool,
    value: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    errorStyles: PropTypes.shape({
        className: PropTypes.string,
        itemClassName: PropTypes.string
    }),
    fieldAttributes: PropTypes.shape({}),
    trim: PropTypes.bool
};

export default FieldConnect(TextField);
