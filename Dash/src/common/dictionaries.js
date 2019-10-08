export const dictionaries = {
    messages: {
        // common messages
        required: () => "error_message_common_require"
    },
    custom: {
        "input-validator": {
            required: () => "error_message_common_require"
        },
        "change-password-re-new-password-validator": {
            checkSameNewPassword: () => "custom_text_new_password_not_match"
        },
        "change-password-old-password-validator": {
            isTruth: () => "custom_text_old_password_not_match"
        }
    }
};
