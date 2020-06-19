const validate = (state, action) => {
    switch(action.type) {
        case 'CHANGE_NAME': {
            if(action.val.length > 0) {
                return {...state, isNameValid: true};
            }
            return state;
        }
        case 'CHANGE_EMAIL': {
            if(/^\S+@\S+\.\S+$/.test(action.val)) {
                return {...state, isEmailValid: true}
            }
            return state;
        }
        case 'CHANGE_PASSWORD': {
            if(action.val.length > 5) {
                return {...state, isPasswordValid: true}
            }
            return state;
        }
        default: {
            return state
        }
    }
}

export default validate;