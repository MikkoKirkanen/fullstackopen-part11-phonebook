import Table from 'react-bootstrap/Table'
import PropTypes from 'prop-types'

const Persons = ({ personsToShow, personId, remove, edit }) => (
  <Table striped borderless size='sm'>
    <tbody>
      {personsToShow?.map((person) => (
        <tr
          key={person.id}
          className={person.id === personId ? 'table-primary' : null}
        >
          <td className='align-middle'>{person.name}</td>
          <td className='align-middle'>{person.number}</td>
          <td className='text-end'>
            <button
              className='btn btn-warning me-3'
              onClick={() => edit(person)}
            >
              Edit
            </button>
            <button className='btn btn-danger' onClick={() => remove(person)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
)

Persons.propTypes = {
  personsToShow: PropTypes.array,
  personId: PropTypes.string,
  remove: PropTypes.func,
  edit: PropTypes.func,
}

export default Persons
