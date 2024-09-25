import {
  useFindAllUserQuery,
  useManageUserBlockMutation,
  useUpdateUserRoleMutation,
} from "@/redux/api/adminApi";
import {
  setUsers,
  updateUsersBlockStatusInState,
  updateUsersRoleStatusInState,
} from "@/redux/feautures/allUserSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Loading from "@/shared-components/Loading";
import { useEffect } from "react";
import { toast } from "sonner";

const UserManagement = () => {
  const users = useAppSelector((state) => state.allUser.users);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useFindAllUserQuery(undefined);
  const [blockUser] = useManageUserBlockMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();

  useEffect(() => {
    if (data?.data) {
      dispatch(setUsers(data.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  //  handle update block status
  const handleBlockUser = async (userId: string, isBlocked: boolean) => {
    try {
      const result = await blockUser({ userId, isBlocked }).unwrap();
      toast.success(result.message);
      dispatch(
        updateUsersBlockStatusInState({
          _id: result.data._id,
          isBlocked: result.data.isBlocked,
        })
      );
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  //  handle update role
  const handleUpdateRole = async (userId: string, role: "user" | "admin") => {
    console.log(role);

    try {
      const result = await updateUserRole({ userId, role }).unwrap();
      toast.success(result.message);
      dispatch(
        updateUsersRoleStatusInState({
          _id: result.data._id,
          role: result.data.role,
        })
      );
    } catch (error) {
      toast.error("Failed to update user role");
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="user-management px-5 py-10">
      <h1 className="text-xl font-bold mb-4">User Management</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users!.map((user) => (
              <tr key={user._id}>
                <td
                  className={`border px-4 py-2 ${
                    user.isBlocked ? "text-red-500" : ""
                  } ${user.role === "admin" ? "font-semibold" : ""}`}
                >
                  {user.name}
                </td>
                <td
                  className={`border px-4 py-2 ${
                    user.isBlocked ? "text-red-500" : ""
                  } ${user.role === "admin" ? "font-semibold" : ""}`}
                >
                  {user.email}
                </td>
                <td
                  className={`border px-4 py-2 ${
                    user.role === "admin" ? "font-semibold" : ""
                  }`}
                >
                  {user.role}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleBlockUser(user._id, !user.isBlocked)}
                    className={`px-4 py-2 rounded ${
                      user.isBlocked ? "bg-green-500" : "bg-red-500"
                    } text-white`}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateRole(
                        user._id,
                        user.role === "admin" ? "user" : "admin"
                      )
                    }
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Change to {user.role === "admin" ? "User" : "Admin"}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
