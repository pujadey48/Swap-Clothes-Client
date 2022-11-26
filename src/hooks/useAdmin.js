import { useEffect, useState } from "react"
import { getUrl } from "../Util/Util";

const useAdmin = uid => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    useEffect(() => {
        if (uid) {
            fetch(getUrl(`/users/admin/${uid}`))
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIsAdmin(data.isAdmin);
                    setIsAdminLoading(false);
                })
        }
    }, [uid])
    return [isAdmin, isAdminLoading]
}

export default useAdmin;