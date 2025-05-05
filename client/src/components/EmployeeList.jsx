import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEmployees, deleteEmployee } from '../services/api';
import toast from 'react-hot-toast';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getEmployees();
                setEmployees(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);

   
const handleDelete = async (id) => {
  toast((t) => (
    <div>
      <p className="text-sm font-medium">Are you sure you want to delete this employee?</p>
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={() => {
            toast.dismiss(t.id);
          }}
          className="px-3 py-1 text-sm border rounded text-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            try {
              await deleteEmployee(id);
              setEmployees(employees.filter(emp => emp.id !== id));
              toast.success("Employee deleted");
            } catch (err) {
              toast.error("Failed to delete");
              console.error(err);
            } finally {
              toast.dismiss(t.id);
            }
          }}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  ), { duration: 10000 });
};

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Users</h2>
                <Link
                    to="/employees/new"
                    className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium "
                >
                    Add User
                </Link>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg ">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm  text-zinc-800 tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-sm  text-zinc-800 tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-sm  text-zinc-800 tracking-wider">Role</th>
                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> */}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {employee.title} {employee.first_name} {employee.last_name}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-800">
                                    {employee.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-700">
                                    {employee.role}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Link
                                        to={`/employees/${employee.id}`}
                                        className="bg-blue-500 text-white hover:bg-blue-500 mr-2 border rounded-md  px-3 py-2 "
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(employee.id)}
                                        className="bg-red-500 cursor-pointer text-white hover:bg-red-500 px-2 py-2 border rounded-md pointer"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;