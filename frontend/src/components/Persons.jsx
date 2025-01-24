import Table from 'react-bootstrap/Table';

const Persons = ({ personsToShow, personId, remove, edit }) => (
  <Table striped size="sm">
    <tbody>
      {personsToShow?.map((person) => (
        <tr key={person.id} className={person.id === personId ? "table-primary": null}>
          <td className="align-middle">{person.name}</td>
          <td className="align-middle">{person.number}</td>
          <td className="text-end">
            <button className="btn btn-warning me-3" onClick={() => edit(person)}>Edit</button>
            <button className="btn btn-danger" onClick={() => remove(person)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default Persons;
