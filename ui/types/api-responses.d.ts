
export interface  ApiResponse<T>  {
    status: 'success' | 'error';
    time: string;
    message: string;
    result?: T; // Optional, will be present on success
    error?: T; // Optional, will be present on error
}