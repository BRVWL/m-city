import React from 'react';

const FormField = ({ formData }) => {
  const renderTemplate = () => {
    let formTemplate = null;
    switch (formData.element) {
      case 'input':
        formTemplate = (
          <div>
            <input {...formData.config} value={formData.value} />
          </div>
        );
        break;
      default:
        formTemplate = null;
        break;
    }
    return formTemplate;
  };

  return <div>{renderTemplate()}</div>;
};

export default FormField;
