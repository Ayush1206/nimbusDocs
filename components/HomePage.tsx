"use client"

import React, { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import styles from './page.module.css';
import axios from 'axios';

interface ApiRequest {
    name: string;
    type: string;
    requestType: string;
    required: boolean;
    description: string;
}

interface Api {
    endpoint: string;
    method: string;
    requestType: string;
    requests: ApiRequest[];
}

const HomePage: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [apis, setApis] = useState<Api[]>([]);
    const [paramData, setParamData] = useState<{ [key: string]: string }>({});
    const [queryData, setQueryData] = useState<{ [key: string]: string }>({});
    const [bodyData, setBodyData] = useState<{ [key: string]: string }>({});
    const [apiResponse, setApiResponse] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type !== 'application/json') {
                setError('Please upload a valid JSON file.');
            } else {
                setError(null);
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const json = JSON.parse(event.target?.result as string);
                        setApis(json);
                    } catch (e) {
                        setError('Invalid JSON file format.');
                    }
                };
                reader.readAsText(file);
            }
        }
    };

    const handleInputChange = (type: string, name: string, value: string) => {
        if (type === 'param') {
            setParamData((prev) => ({ ...prev, [name]: value }));
        } else if (type === 'query') {
            setQueryData((prev) => ({ ...prev, [name]: value }));
        } else if (type === 'body') {
            setBodyData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleRunApi = async (api: Api) => {
       
        try {
            setApiResponse(JSON.stringify(null))
            // Prepare the data to send to the backend API
            const requestData = {
              endpoint: api.endpoint,        // The endpoint we need to call
              method: api.method,            // HTTP method (GET, POST, PUT, etc.)
              paramData: paramData,          // Parameters to be included in the URL path
              queryData: queryData,          // Query parameters to be appended to the URL
              bodyData: bodyData,            // Data to be sent in the body of the request
            };
        
            // Call the backend API to handle the actual request
            const response = await axios.post('/api/runApi', requestData, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
        
            // Handle response
            console.log('API Response:', response.data);
            setApiResponse(JSON.stringify(response.data, null, 2));
          } catch (error) {
            console.error('Error:', error);
            setApiResponse('An error occurred while running the API');
          }
        
    }

    const handleReset = () => {
        setApis([]);
        setError(null);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-black text-white p-8">
            <h1 className="text-5xl font-extrabold mb-12 text-center">Welcome to NimbusDocs</h1>
            {apis.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
                    <div className="flex flex-col items-center">
                        <label className="flex flex-col items-center bg-gray-200 p-6 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-300 transition duration-300">
                            <FiUploadCloud size={48} />
                            <span className="text-gray-600 mb-2">Click to upload your JSON file</span>
                            <input
                                type="file"
                                accept=".json"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                        <button className="bg-purple-700 text-white px-6 py-3 rounded mt-6 hover:bg-purple-800 transition duration-300">
                            Upload JSON
                        </button>
                        {error && <p className="text-red-500 mt-4">{error}</p>}
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-3xl">
                    <button
                        onClick={handleReset}
                        className="bg-red-600 text-white px-6 py-3 rounded mb-6 hover:bg-red-700 transition duration-300"
                    >
                        Reset Uploaded File
                    </button>
                    {apis.map((api, index) => (
                        <details key={index} className="mb-4">
                            <summary
                                className={`flex items-center justify-between p-4 rounded-lg cursor-pointer text-white shadow-md transition duration-300 ${api.method.toLowerCase() === 'get'
                                    ? 'bg-gradient-to-r from-green-400 to-green-600'
                                    : api.method.toLowerCase() === 'post'
                                        ? 'bg-gradient-to-r from-blue-400 to-blue-600'
                                        : api.method.toLowerCase() === 'put'
                                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                                            : api.method.toLowerCase() === 'delete'
                                                ? 'bg-gradient-to-r from-red-400 to-red-600'
                                                : 'bg-gradient-to-r from-gray-400 to-gray-600'
                                    }`}
                                style={{ borderRadius: '50px', padding: '10px 20px' }}
                            >
                                <span className="font-bold capitalize">{api.method}:</span> <span>{api.endpoint}</span>
                            </summary>
                            <div className="p-4 bg-gray-800 rounded-lg mt-2">
                                <h3 className="text-lg font-bold mb-2">Request Details:</h3>
                                <form className="flex flex-col gap-4">
                                    {api.requests.map((request, reqIndex) => (
                                        <div key={reqIndex} className="flex items-center gap-4">
                                            <label htmlFor={request.name} className="font-semibold">
                                                {request.name} ({request.type}) {request.requestType} {request.required && <span className="text-red-500">*</span>}:
                                            </label>
                                            <input
                                                type="text"
                                                id={request.name}
                                                name={request.name}
                                                className="p-2 rounded bg-gray-700 text-white flex-grow"
                                                required={request.required}
                                                placeholder={request.requestType === 'param' ? 'URL Parameter' : request.requestType === 'query' ? 'Query Parameter' : 'Body Data'}
                                                onChange={(e) => handleInputChange(request.requestType, request.name, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 transition duration-300"
                                        onClick={() => handleRunApi(api)}
                                    >
                                        Run API
                                    </button>
                                </form>
                                {apiResponse && (
                                    <div className="mt-4 p-4 bg-gray-900 rounded text-white">
                                        <h3 className="text-lg font-bold mb-2">Response:</h3>
                                        <pre className="whitespace-pre-wrap">{apiResponse}</pre>
                                    </div>
                                )}
                            </div>
                        </details>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;

