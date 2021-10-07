
export const LoginUtil = async ({username, password}) => {
    const userObj = {
        username: 'admin@local',
        isAdmin: true,
        isLoggedIn: false,
        password: 'password',
    }

    //const mutatedUserObj = {...userObj};

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(username === userObj.username && password === userObj.password) {
                // Do not mutate our original state, make a copy and act on that
                const mutatedUserObj = {...userObj, isLoggedIn: true};
                // write to localStorage
                resolve({ mutatedUserObj });
            } else {
                reject();
            }

        }, 3000);
    });
}