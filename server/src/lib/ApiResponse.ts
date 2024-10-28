export interface ApiResponse<T> {
    status: 'success' | 'error';
    time:string;
    message: string;
    data?: T; // Optional, will be present on success
    error?: T; // Optional, will be present on error
}

export const ResponseEntity = <T>(status: 'success' | 'error', message: string, data?: T, error?: T): ApiResponse<T> => {
    return {
        status,
        time : Date(),
        message,
        data,
        error,
    };
};

