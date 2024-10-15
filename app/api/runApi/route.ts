import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { endpoint, method, paramData = {}, queryData = {}, bodyData = {} } = body;

    // Step 1: Construct the URL with params and query parameters
    let url = endpoint;

    let queryParams = '';
    Object.entries(paramData).forEach(([key, value]) => {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        queryParams += `${key}=${encodeURIComponent(String(value))}&`;
      }
    });

    // Append query parameters if available in queryData
    Object.entries(queryData).forEach(([key, value]) => {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        queryParams += `${key}=${encodeURIComponent(String(value))}&`;
      }
    });

    if (queryParams) {
      queryParams = queryParams.slice(0, -1); // Remove trailing '&'
      url += `?${queryParams}`;
    }


    // Step 2: Setup request options
    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Step 3: Add body data if the method requires it
    if (method.toLowerCase() === 'post' || method.toLowerCase() === 'put') {
      requestOptions.body = JSON.stringify(bodyData);
    }

    // Log the final URL and request options for better visibility
    console.log("Logging API endpoint and data to be passed:", url);
    console.log("Request Options:", requestOptions);

    // Step 4: Make the API call
    const response = await fetch(url, requestOptions);
    const responseData = await response.json();

    // Step 5: Return the response data to the frontend
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('Error making API call:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
