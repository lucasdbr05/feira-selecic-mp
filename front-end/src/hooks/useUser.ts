import { useEffect, useState } from 'react';
import { Api } from '../api-client/api';
import { UserStored } from '../api-client/types';

const useUserData = () => {
  const api = new Api()
  const [userData, setUserData] = useState<UserStored | undefined>(undefined);
  useEffect(() => {
      const fetchUserData = async () => {
        const user =await api.getUserActive().then(res => res).catch(err => undefined);
        console.log(user)
        if(!user) {
            setUserData(undefined)
            return
        }
        setUserData(user)
        return user;
    };

    fetchUserData();
  }, []);

  return userData;
};
export default useUserData;