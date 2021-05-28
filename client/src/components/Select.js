import PropTypes from 'prop-types';
import { SelectField } from 'evergreen-ui';

const Select = ({ label, options, selection, onChange }) => (
  <SelectField label={label} value={selection.key} onChange={(e) => onChange(e.target.value)}>
    {options.map(({ key, label }) => (
      <option key={key} value={key}>
        {label}
      </option>
    ))}
  </SelectField>
);

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  selection: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
  label: 'Select:',
  options: [],
};

export default Select;
