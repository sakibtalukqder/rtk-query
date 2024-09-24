import { Link } from "react-router-dom";
import { useDeleteUserMutation, useGetUsersQuery } from "../Api/ContextApi";

const Home = () => {

    const { data, error, isLoading, isSuccess } = useGetUsersQuery()
    console.log(data, error, isLoading, isSuccess);

    const [deleteUser] = useDeleteUserMutation()

    const handleDelete = (id: any) => {
        window.confirm("delete user ??")
        deleteUser(id)
    }

    if (isLoading) {
        return <>
            Loading .....
        </>
    }

    if (error) {
        return <>
            Error Detected, <br />
            Cannot fetch Data .....
        </>
    }

    return (
        <div>
            <div className="flex flex-col md:mx-16">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table
                                className="min-w-full text-left text-sm font-light text-surface">
                                <thead
                                    className="border-b border-neutral-200 font-medium text-center ">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">#</th>
                                        <th scope="col" className="px-6 py-4">Name</th>
                                        <th scope="col" className="px-6 py-4">Email</th>
                                        <th scope="col" className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        data?.map((user, index) => (
                                            <tr className="border-b border-neutral-200 text-center" key={index}>
                                                <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{user.name}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                                                <td className="whitespace-nowrap px-6 py-4">

                                                    <div className="dropdown dropdown-end">
                                                        <div tabIndex={0} role="button" className="btn m-1 btn-sm">
                                                            Action
                                                        </div>
                                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                                            <li>
                                                                <Link to={`/view/${user.id}`} className="btn btn-sm rounded-none bg-green-500">View</Link>
                                                            </li>
                                                            <li>
                                                                <Link to={`/edit/${user.id}`} className="btn btn-primary btn-sm rounded-none">Edit</Link>
                                                            </li>
                                                            <li>
                                                                <button onClick={() => handleDelete(user.id)} className="btn btn-error btn-sm rounded-none">Delete</button>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;