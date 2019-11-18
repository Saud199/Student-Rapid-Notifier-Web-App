// Object and Variables Who stored  and Provide Values in all Over Application 
const INITIAL_STATE = {
    emailLink : 'http://localhost:5000/send' ,
    accountType : '' ,
    signupInfo : {} ,
    studentInfo :{} ,
    teacherInfo:{} ,
    organizationInfo:{},
    adminInfo:{},
    dynamicInfo:{} , 
    chatInfo:{}
}

// Use Case To Check the triggered Function of Action.js and set the triggered function value init respective obeject or variable  
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CHATDATA':
            return ({
                ...state,
                 chatInfo : action.payload
                })
        case 'DYNAMICDATA':
            return ({
                ...state,
                 dynamicInfo : action.payload
                })
        case 'USERINFO':
            return ({
                ...state,
                 userInfo : action.payload
                })

            case 'SIGNUPINFO' :
            return ({
                ...state,
                 signupInfo : action.payload 
            })

            case 'STUDENTINFO' :
            return ({
                ...state,
                 studentInfo : action.payload ,
                 accountType : action.payload.accountType || 'not Defined'
            })

            case 'TEACHERINFO' :
            return ({
                ...state,
                 teacherInfo : action.payload ,
                 accountType : action.payload.accountType || 'not Defined'
            })

            case 'ORGANIZATIONINFO' :
            return ({
                ...state,
                 organizationInfo : action.payload ,
                 accountType : action.payload.accountType || 'not Defined'
            })

            case 'ADMININFO' :
            return ({
                ...state,
                 adminInfo : action.payload ,
                 accountType : action.payload.accountType || 'not Defined'
            })


            
        default:
         return state;
    }

}