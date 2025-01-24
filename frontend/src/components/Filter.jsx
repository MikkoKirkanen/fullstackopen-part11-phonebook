import PropTypes from 'prop-types'

const Filter = ({ filter, onFilterChange }) => {
  return (
    <div className='filter-container mb-3'>
      <label htmlFor='filter'>Filter by name</label>{' '}
      <input
        id='filter'
        className='form-control'
        value={filter}
        onChange={onFilterChange}
      />
    </div>
  )
}

Filter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
}

export default Filter
