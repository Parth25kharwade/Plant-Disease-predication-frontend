// Response validation utilities

export const validateUploadResponse = (response) => {
    const validation = {
        isValid: false,
        errors: [],
        warnings: [],
        data: response
    };

    // Check if response exists
    if (response === null) {
        validation.errors.push('Response is null');
        return validation;
    }

    if (response === undefined) {
        validation.errors.push('Response is undefined');
        return validation;
    }

    // Check response type
    if (typeof response === 'string') {
        if (response.trim() === '') {
            validation.errors.push('Response is empty string');
            return validation;
        }
        
        // Try to parse as JSON
        try {
            const parsed = JSON.parse(response);
            return validateUploadResponse(parsed);
        } catch (e) {
            validation.warnings.push('Response is string but not valid JSON');
            validation.isValid = true; // String responses might be valid
            return validation;
        }
    }

    if (typeof response !== 'object') {
        validation.errors.push(`Unexpected response type: ${typeof response}`);
        return validation;
    }

    // Check if empty object
    if (Object.keys(response).length === 0) {
        validation.errors.push('Response is empty object');
        return validation;
    }

    // Check for expected fields (these are common but not required)
    const expectedFields = ['disease', 'confidence', 'treatment', 'description'];
    const presentFields = expectedFields.filter(field => response.hasOwnProperty(field));
    
    if (presentFields.length === 0) {
        validation.warnings.push('Response does not contain any expected fields: ' + expectedFields.join(', '));
    }

    // Check confidence value if present
    if (response.confidence !== undefined) {
        if (typeof response.confidence !== 'number') {
            validation.warnings.push('Confidence field is not a number');
        } else if (response.confidence < 0 || response.confidence > 1) {
            validation.warnings.push('Confidence value should be between 0 and 1');
        }
    }

    // If we get here, the response has some valid structure
    validation.isValid = true;
    return validation;
};

export const logResponseValidation = (response, context = 'API Response') => {
    const validation = validateUploadResponse(response);
    
    console.group(`🔍 ${context} Validation`);
    console.log('Raw response:', response);
    console.log('Response type:', typeof response);
    console.log('Is valid:', validation.isValid);
    
    if (validation.errors.length > 0) {
        console.error('❌ Errors:', validation.errors);
    }
    
    if (validation.warnings.length > 0) {
        console.warn('⚠️ Warnings:', validation.warnings);
    }
    
    if (validation.isValid) {
        console.log('✅ Response appears to be valid');
    }
    
    console.groupEnd();
    
    return validation;
};