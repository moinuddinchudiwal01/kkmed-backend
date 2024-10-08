export const MESSAGE = {
    COMMON: {
        BAD_REQUEST: "Bad request. Please check your input.",
        UNAUTHORIZED: "Unauthorized access.",
        FORBIDDEN: "Access to this resource is forbidden.",
        SERVER_ERROR: "Internal server error. Please try again later.",
    },
    AUTH: {
        PHONE_REQUIRED: "Mobile number is required",
        PHONE_EXIST: "Mobile number already exists.",
        OTP_SUCCESS: "OTP sent successfully",
        PHONE_OTP_REQUIRED: "Mobile number and OTP are required",
        USER_NOT_FOUND: "User not found.",
        USER_ALREADY_VERIFY: "User already verified",
        INVALID_OTP: "Invalid OTP",
        OTP_EXPIRED: "OTP has expired",

        LOGIN_SUCCESS: "Login successful.",
        EMAIL_EXIST: "Email already exists.",
        EMAIL_NOT_FOUND: "Email not found.",
        PASSWORD_INCORRECT: "Password is incorrect.",
        PASSWORD_RESET: "Password reset link has been sent to your email.",
        PASSWORD_RESET_SUCCESS: "Password reset successful.",
        PASSWORD_RESET_EXPIRED: "Password reset link has expired.",
        PASSWORD_RESET_INVALID: "Invalid password reset link.",
        PASSWORD_CHANGE_SUCCESS: "Password change successful.",
        DEACTIVATED: "Your account has been deactivated.",
        REGISTER_SUCCESS: "Registration successful.",
    }
};