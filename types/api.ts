export enum ResponseStatus {
  SUCCESS = 200, // General success response
  CREATED_OR_UPDATED = 201, // POST or PUT request successfully processed
  SUCCESS_BUT_NO_DATA_TO_RETURN = 204, // Request succeeded but returns no content (e.g, after DELETE request)
  BAD_REQUEST = 400, // Invalid request
  NOT_FOUND = 404, // Resource not found
  UNPROCESSABLE_ENTITY = 422, // The request could not be processed (e.g., failed Zod validation)
  UNAUTHORISED = 401, // User is not authenticated (token expired, login required)
  FORBIDDEN = 403, // User is authenticated but does not have permission (Role based access)
  INTERNAL_SERVER_ERROR = 500, // An unexpected error occurred on the server
}
