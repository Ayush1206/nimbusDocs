# NimbusDocs

**NimbusDocs** is an intuitive API documentation tool inspired by Swagger, designed to make API exploration easier without complicated setups. Simply upload a JSON file that describes your API, and NimbusDocs will generate a detailed, interactive API documentation page, similar to Swagger UI.

### Features
- **Multi-Language Support**: Works seamlessly with APIs in multiple languages, such as PHP, Node.js, Python, Ruby on Rails, etc.
- **Simple Setup**: No complex configuration is required—just download the project, run it, and upload your JSON files.
- **Interactive API Testing**: Allows you to run your API endpoints and view responses directly in the UI, similar to Postman or Swagger.
- **File Upload for Documentation**: Simply upload a JSON file, and NimbusDocs will automatically generate API documentation for you.
- **Gradient Method Colors**: Visual representation of HTTP methods with unique gradient styles for better clarity.
- **Reset Functionality**: Easily reset your uploaded JSON file to make new API entries.

### Getting Started

#### Prerequisites
- **Node.js** (v16 or higher recommended)
- **Git** for cloning the repository

#### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Ayush1206/nimbusDocs.git
   cd nimbusDocs
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Your app will be live at `http://localhost:3000`.

#### Usage
1. **Upload JSON File**:
   - On the home page, click the "Upload JSON" button and select your API JSON file.
   - NimbusDocs will parse the file and generate an interactive interface for exploring your API.

2. **Run API Calls**:
   - After uploading, each API method is displayed as a collapsible section.
   - Fill in required parameters and click the "Run API" button to make requests.

3. **Reset JSON File**:
   - Use the "Reset Uploaded File" button to start fresh with a new JSON file.

### JSON File Format
The uploaded JSON file should have the following structure:
```json
[
  {
    "endpoint": "https://example.com/api/posts",
    "method": "GET",
    "requestType": "application/json",
    "requests": [
      {
        "name": "userId",
        "type": "int",
        "requestType": "param",
        "required": true,
        "description": "The unique identifier for the user."
      }
    ]
  }
]
```
- **endpoint**: The URL of the API.
- **method**: The HTTP method (e.g., GET, POST).
- **requestType**: The content type.
- **requests**: Contains details about parameters to be included.

### Technologies Used
- **Next.js 14**: Latest version of Next.js for both the frontend and backend.
- **Tailwind CSS**: For styling the UI components.
- **React Icons**: For intuitive icons in the interface.
- **Axios**: To make HTTP requests from the frontend.

### Folder Structure
- **app/**: Contains the main components and pages.
- **components/**: Holds reusable UI components like `HomePage`.
- **app/api/**: Contains the server-side API handler (`runApi`).

### Contributing
If you want to contribute to NimbusDocs:
1. **Fork the Repository**.
2. **Create a Feature Branch** (`git checkout -b feature-branch-name`).
3. **Commit Your Changes** (`git commit -m 'Add some feature'`).
4. **Push to the Branch** (`git push origin feature-branch-name`).
5. **Open a Pull Request**.

### Contact
If you have any questions or suggestions, feel free to reach out:
- GitHub: [Ayush1206](https://github.com/Ayush1206)
- Email: [ayushmishra.1206@gmail.com](mailto:ayushmishra.1206@gmail.com)

### Acknowledgements
- **Swagger**: For inspiring the design and concept.
- **React**: For providing a great framework to build user interfaces.

---

Thank you for using **NimbusDocs**! Your feedback and contributions are always welcome.
