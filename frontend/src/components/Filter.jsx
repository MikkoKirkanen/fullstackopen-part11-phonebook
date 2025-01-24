const Filter = (props) => {
  return (
    <div className="filter-container mb-3">
      <label htmlFor="filter">Filter by name</label> <input id="filter" className="form-control" value={props.filter} onChange={props.onFilterChange} />
    </div>
  );
};

export default Filter;
