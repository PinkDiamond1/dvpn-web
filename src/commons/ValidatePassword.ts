/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
    NEW_PASSWORD_ERROR_TO_SHORT,
    NEW_PASSWORD_ERROR_BLANK,
    NEW_PASSWORD_ERROR_NOT_SAME,
} from '../constants/defaults';

interface ValidateResultInterface {
    success: boolean;
    passwordBlank: boolean;
    passwordNotSame: boolean;
    passwordShort: boolean;
    errorMessage: string;
}

export const validatePassword = (password: string, passwordRepeat: string): ValidateResultInterface => {
    const response = {
        success: true,
        passwordBlank: false,
        passwordNotSame: false,
        passwordShort: false,
        errorMessage: '',
    };

    if (isPasswordsNotBlank(password, passwordRepeat)) {
        response.success = false;
        response.passwordBlank = true;
        response.errorMessage = NEW_PASSWORD_ERROR_BLANK;

        return response;
    }

    if (isPasswordsSame(password, passwordRepeat)) {
        response.success = false;
        response.passwordNotSame = true;
        response.errorMessage = NEW_PASSWORD_ERROR_NOT_SAME;

        return response;
    }

    if (isPasswordValid(password)) {
        response.success = false;
        response.passwordShort = true;
        response.errorMessage = NEW_PASSWORD_ERROR_TO_SHORT;

        return response;
    }

    return response;
};

const isPasswordsSame = (password: string, passwordRepeat: string): boolean => {
    return password !== passwordRepeat;
};

const isPasswordValid = (password: string): boolean => {
    return password.length < 10;
};

const isPasswordsNotBlank = (password: string, passwordRepeat: string): boolean => {
    return !(password !== '' || passwordRepeat !== '');
};