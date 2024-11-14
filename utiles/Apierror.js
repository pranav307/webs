export class ApiError extends Error {
    // Constructor for ApiError, taking in statusCode, message, errors, and stack
    constructor(
        statusCode,                // The HTTP status code related to the error (e.g., 404, 500)
        message = "something went wrong",  // The error message, defaulting to a generic one
        errors = [],                // An array to store additional error details
        stack = ""                  // Optional stack trace, defaulting to an empty string
    ) {
        super(message);  // Call the parent class (Error) constructor with the message argument
        this.statusCode = statusCode;  // Assign the HTTP status code to the instance
        this.data = null;  // `data` field is initialized as null (can be used to hold any additional data)
        this.message = message;  // Custom error message
        this.success = false;  // `success` is set to false, indicating the error
        this.errors = errors;  // Store additional error details in `errors` array

        // Handling the stack trace (if provided or using the built-in one)
        if (stack) {
            this.stack = stack;  // A stack trace is a report that provides a detailed overview of the sequence of function or method calls that were active in the program at the time an error (or exception) occurred. It helps developers understand the context in which the error happened by showing the call hierarchy, allowing them to trace back the execution flow from the point of failure to its origin.
        } else {
            Error.captureStackTrace(this, this.constructor);  // If no stack is provided, capture the current stack trace
        }
    }
}
