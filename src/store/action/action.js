// Exported Function Which are import into mapDispatchToProp with differ name in differ class. They get values in
// function parameter from different class and pass it into reducer.js class where it can be checked in switch case
//and assign values to respective object and variable and stored values in store . The store values will get using
// mapStateToProp function 

export function DynamicData(dinfo) {
    return dispatch => {
        dispatch({ type: 'DYNAMICDATA', payload: dinfo  })
    }
}

export function ChatData(chinfo) {
    return dispatch => {
        dispatch({ type: 'CHATDATA', payload: chinfo  })
    }
}


export function SignupDetail(cinfo) {
    return dispatch => {
        dispatch({ type: 'SIGNUPINFO', payload: cinfo  })
    }
}

export function UserDetail(uinfo) {
    return dispatch => {
        dispatch({ type: 'USERINFO', payload: uinfo  })
    }
}


export function StudentDetail(sinfo) {
    return dispatch => {
        dispatch({ type: 'STUDENTINFO', payload: sinfo  })
    }
}

export function TeacherDetail(tinfo) {
    return dispatch => {
        dispatch({ type: 'TEACHERINFO', payload: tinfo  })
    }
}

export function OrganizationDetail(oinfo) {
    return dispatch => {
        dispatch({ type: 'ORGANIZATIONINFO', payload: oinfo  })
    }
}

export function AdminDetail(ainfo) {
    return dispatch => {
        dispatch({ type: 'ADMININFO', payload: ainfo  })
    }
}