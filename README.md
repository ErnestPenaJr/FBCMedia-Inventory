# Media-Inventory
**Instructions for Anthropic to Create Media Inventory Tracking Application**

### Overview

Create a web-based PHP application to manage and track inventory of media equipment for a church. The application should include the ability to print barcode labels, upload images of equipment, and facilitate barcode scanning using mobile devices. The database will be used to store information about the media equipment, including its status and location.

### Requirements

1. **Backend Development (PHP & MySQL)**

   - Use PHP for server-side scripting and MySQL as the database.
   - Implement CRUD operations for managing media inventory.
   - The table should include fields for:
     - **ID**: Primary key, auto-increment.
     - **Name**: Name of the equipment.
     - **Category**: Category of equipment.
     - **Serial Number**: Serial number for identification.
     - **Condition Status**: Current condition of the item.
     - **Location**: Where the item is stored.
     - **Quantity**: Number of units available.
     - **Image Path**: Path to the image of the item.
     - **Barcode**: A string representing the barcode number.
     - **Date Added**: Timestamp of when the equipment was added.

2. **Database Setup**

   - Create a MySQL database named `media_inventory`.
   - Create a table called `equipment` with the columns mentioned above.
   - Ensure the database connection is secure and error-handling is in place.

3. **File Upload Handling**

   - Add functionality for uploading images of each equipment.
   - Store these images in a directory (`uploads/`) on the server.
   - Ensure file validation for size and type (allow only `jpg`, `jpeg`, `png`, `gif` formats).

4. **Frontend Development (HTML, JavaScript, jQuery, Bootstrap)**

   - Use Bootstrap 5 to create a responsive, user-friendly interface.
   - Implement a form for adding new equipment, including fields for name, category, serial number, condition, location, quantity, barcode, and image.
   - Include a button to submit the form via AJAX to the backend.

5. **AJAX Integration for Real-Time Updates**

   - Use jQuery to submit forms asynchronously.
   - Fetch the equipment list dynamically and update the inventory table without page refresh.
   - Display alerts or notifications based on form submission success or failure.

6. **Inventory List Table**

   - Display the list of all equipment in an HTML table using Bootstrap styling.
   - Include columns for Name, Category, Serial Number, Condition, Location, Quantity, Barcode, and Image.
   - Ensure the image of each equipment is displayed as a small thumbnail (width: 100px).

7. **Barcode Printing and Scanning**

   - Integrate the ability to print barcode labels for each equipment item.
   - Use a JavaScript library or plugin to generate the barcode dynamically.
   - Facilitate barcode scanning using a mobile device.
   - Create a mobile-based web page that allows users to use their phone's camera to scan barcodes. The scanned barcode should be used to identify and update the inventory accordingly. Use a JavaScript library such as **QuaggaJS** or **Html5Qrcode** to handle barcode scanning through the camera.

8. **Mobile Compatibility**

   - Ensure the front-end interface is optimized for use on mobile devices, especially for scanning barcodes.
   - Develop a dedicated mobile-friendly page that allows users to easily access camera functionality to scan items.
   - Implement responsive design principles to ensure the interface works seamlessly on different screen sizes.

9. **Additional Considerations**

   - **Security**: Include validation and sanitization of all inputs to prevent SQL injection and XSS vulnerabilities.
   - **Image Management**: Provide file validation for image uploads (file type and size limits) and store the image path in the database.

### Technical Stack

- **Backend**: PHP (>=7.4), MySQL
- **Frontend**: HTML, Bootstrap 5, jQuery (>=3.6.0)
- **Libraries**: Use libraries for barcode generation and image uploading as needed.
- **Barcode Scanning**: Use **QuaggaJS** or **Html5Qrcode** for implementing barcode scanning with mobile cameras.
- **Storage**: Images should be stored in an `uploads/` directory, with file paths saved in the database.

### Sample Endpoints

1. **Add Equipment (POST)**

   - Endpoint: `/inventory.php`
   - Method: `POST`
   - Action: `add`
   - Parameters: `name`, `category`, `serial_number`, `condition_status`, `location`, `quantity`, `barcode`, `image` (file)

2. **List Equipment (GET)**

   - Endpoint: `/inventory.php`
   - Method: `GET`
   - Action: `list`

### Suggested Improvements

- Consider adding user authentication to control access to the inventory system.
- Implement role-based access so that only authorized personnel can add or remove items.
- Add reporting features to export inventory data to CSV or PDF formats.

### Deliverables

- PHP script for CRUD operations.
- Database schema for equipment management.
- HTML, CSS, JavaScript files for front-end implementation.
- Mobile-friendly page with camera-based barcode scanning functionality.
- Instructions on how to set up the environment and database.

Please let me know if further clarifications or additional features are needed. This should provide a solid foundation for developing the media equipment inventory system with the required functionality.

