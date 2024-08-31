document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const statusMessage = document.getElementById('status-message');
    const fileNameDisplay = document.getElementById('file-name');
    const uploadButton = document.getElementById('upload-button');
    const body = document.body;

    // Show the upload area and switch to dark theme when dragging starts
    const showUploadArea = (e) => {
        e.preventDefault();
        uploadArea.style.display = 'flex';
        body.classList.add('dark-theme');
        setTimeout(() => uploadArea.classList.add('dragging'), 0);
        setTimeout(() => statusMessage.textContent = 'يمكنك إفلات الملف الآن...', 300);
    };

    // Hide the upload area and switch back to light theme when dragging leaves the window or drop is completed
    const hideUploadArea = (e) => {
        e.preventDefault();
        const isOutside = e.clientX === 0 && e.clientY === 0; // Detect if the mouse has left the window
        if (isOutside) {
            uploadArea.style.display = 'none';
            body.classList.remove('dark-theme');
            statusMessage.textContent = 'الرجاء سحب الملف لرفعه';
            fileNameDisplay.classList.remove('show');
            statusMessage.classList.remove('show');
        }
    };

    // Handle file drop event
    const handleDrop = (e) => {
        e.preventDefault();
        uploadArea.style.display = 'none'; // Hide after dropping
        body.classList.remove('dark-theme');
        fileInput.files = e.dataTransfer.files; // Transfer the files to the input element
        const fileName = fileInput.files.length ? fileInput.files[0].name : '';
        updateFileNameAndStatus(fileName);
    };

    // Handle file input change event
    const handleFileChange = () => {
        const fileName = fileInput.files.length ? fileInput.files[0].name : '';
        updateFileNameAndStatus(fileName);
    };

    // Update file name and status message
    const updateFileNameAndStatus = (fileName) => {
        fileNameDisplay.textContent = `اسم الملف: ${fileName}`;
        statusMessage.textContent = 'جاري المعالجة...';
        fileNameDisplay.classList.add('show');
        statusMessage.classList.add('show');

        // Simulate processing delay
        setTimeout(() => {
            statusMessage.textContent = 'جاهز للتحميل!';
            uploadButton.disabled = false;
            uploadButton.classList.add('show');
        }, 1000);

        setTimeout(() => {
            statusMessage.classList.remove('show');
        }, 2000);
    };

    // Prevent default dragover behavior
    const preventDefault = (e) => e.preventDefault();

    // Event listeners
    document.addEventListener('dragenter', showUploadArea);
    document.addEventListener('dragleave', hideUploadArea);
    document.addEventListener('dragover', preventDefault);
    uploadArea.addEventListener('drop', handleDrop);
    uploadArea.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileChange);
});
