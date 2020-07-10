const validate = (state, action) => {
    switch(action.type) {
        case 'CHANGE_NAME': {
            if(action.val.length > 0) {
                return {...state, isNameValid: true};
            }
            return {...state, isNameValid: false};
        }
        case 'CHANGE_SCORE': {
            if(/^\d+(\.[1-9])?$/.test(action.val)) {
                return {...state, isScoreValid: true}
            }
            return {...state, isScoreValid: false}
        }
        case 'CHANGE_EMAIL': {
            if(/^\S+@\S+\.\S+$/.test(action.val)) {
                return {...state, isEmailValid: true}
            }
            return {...state, isEmailValid: false}
        }
        case 'CHANGE_PASSWORD': {
            if(action.val.length > 5) {
                return {...state, isPasswordValid: true}
            }
            return {...state, isPasswordValid: false};
        }
        default: {
            return state
        }
    }
}

export default validate;