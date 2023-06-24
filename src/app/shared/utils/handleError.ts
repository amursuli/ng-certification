import { HttpErrorResponse } from '@angular/common/http';

export const handleApiError = (error: HttpErrorResponse) => {
  let errorMessage = 'An API error occurred';

  if (error.error && error.error.message) {
    errorMessage = `API Error: ${error.error.message}`;
  }

  console.log(`Error: ${errorMessage}`);
};
