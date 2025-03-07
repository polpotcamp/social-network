import styles from './UsersList.module.css'
import { useCallback, useState, useEffect } from 'react'
import axios from 'axios'
import { UserItem } from '../UserItem/UserItem'
import { TUser } from '../../utils/types'
export const UserList = () => {
    const [users, setUsers] = useState<Array<TUser>>()
   const  fetchUsers = useCallback(async () => {
    const { data } = await axios.get(
      `http://localhost:5000/users`
    );
    setUsers(data.data);
  }, []);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  console.log(users)
    return(
        users?
        <div className={`${styles.Container}`}>
            <h2 className={`${styles.Title}`}>Список пользоватлей </h2>
            <div className={`${styles.List}`} >
            {users?.map((user, idx) => (
            <UserItem  key={idx} userId={user._id} />
          ))}
            </div>
        </div>
        :null
    )
}
