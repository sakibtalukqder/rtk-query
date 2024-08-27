import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateUserMutation, useGetUserByIdQuery, useUpdateUserMutation } from "../../Api/ContextApi";

const Create = () => {

  const [editMode, setEditMode] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const [createUser, { error, isLoading, isSuccess }] = useCreateUserMutation()
  console.log(error, isLoading, isSuccess);

  const { id } = useParams()
  const { data } = useGetUserByIdQuery(`${id}`)
  const [updateUser] = useUpdateUserMutation()

  useEffect(() => {

    if (!id) {
      setEditMode(false)
    }
    if (id) {
      setEditMode(true)
    }

  }, [id])


  const handleSubmit = async (e: any) => {
    e.preventDefault()


    if (!editMode) {
      const user = { name, email }
      await createUser(user)
      navigate('/')
    }

    if (editMode) {
      interface edittedUser {
        name: string,
        email: string,
      }
      const edittedUser = {
        name: name || `${data?.name}`,
        email: email || `${data?.email}`,
      }
      updateUser({ id, ...edittedUser })
      navigate('/')
    }

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
    <div className="flex items-center justify-center py-28 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Create User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              name="name"
              defaultValue={data && data.name}
              placeholder="Enter your name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              defaultValue={data && data.email}
              placeholder="Enter your email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-6"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;